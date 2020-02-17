// ==================
// PUERTO
// ==================
process.env.PORT = process.env.PORT || 3000;

// ==================
// ENTORNO
// ==================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==================
// Base de datos
// ==================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/basuras-acerinox';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ==================
// vencimiento del token 99999999999999h
// ==================
process.env.CADUCIDAD_TOKEN = "10h"; // 10 horas

// ==================
// SEED de autenticación
// ==================

process.env.SEED = process.env.SEED || 'secret';