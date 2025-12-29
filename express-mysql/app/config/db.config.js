// config/db.config.js (Código CORREGIDO y Actualizado)

// 1. IMPORTAR mysql2/promise (con soporte para async/await)
const mysql = require('mysql2/promise'); 

// 2. Definir la configuración de la conexión (asegúrate de que los nombres de los archivos .json sean correctos)
const dbConfiguration = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'employees',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Usar Pool para eficiencia
    queueLimit: 0,
};

// 3. Crear el Pool de conexiones y exportarlo
const dbPool = mysql.createPool(dbConfiguration);

module.exports = dbPool;