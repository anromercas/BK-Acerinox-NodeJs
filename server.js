const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { verifyToken } = require('./middlewares/auth');


dotenv.config({ path: './config/config.env' });

connectDB();

const checklists = require('./routes/checklists');
const checklistInstances = require('./routes/checklistInstances');
const queries = require('./routes/queries');
const users = require('./routes/users');
const login = require('./routes/login');
const upload = require('./routes/upload');
const image = require('./routes/image');
const incident = require('./routes/incident');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));


app.use('/api/v1/login', login);
app.use('/api/v1/image', image);
app.use('/api/v1/upload', upload);


// VERIFY TOKEN
//app.use(verifyToken);



app.use('/api/v1/checklists', checklists);
app.use('/api/v1/checklistInstances', checklistInstances);
app.use('/api/v1/queries', queries);
app.use('/api/v1/users', users);
app.use('/api/v1/incident', incident);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

