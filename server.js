const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const tasks = require('./routes/tasks');
const opss = require('./routes/opss');
const checklists = require('./routes/checklists');
const checklistInstances = require('./routes/checklistInstances');
const opsInstances = require('./routes/opsInstances');
const queries = require('./routes/queries');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tasks', tasks);
app.use('/api/v1/opss', opss);
app.use('/api/v1/checklists', checklists);
app.use('/api/v1/opsInstances', opsInstances);
app.use('/api/v1/checklistInstances', checklistInstances);
app.use('/api/v1/queries', queries);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

