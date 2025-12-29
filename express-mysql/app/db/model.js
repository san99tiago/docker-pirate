// db/model.js

// Importamos el Pool de conexiones que ya configuramos con mysql2/promise
// Es crucial que 'dbConn' apunte al Pool/Conexión correcta con soporte para Promesas.
const dbConn = require("../config/db.config");

const model = {
    // ----------------------------------------------------------------------
    // 1. OBTENER TODOS LOS DESARROLLADORES (GET ALL)
    // Se usa 'async' y se reemplaza 'req, res' por el retorno directo de datos.
    // ----------------------------------------------------------------------
    async getAllDevelopers() {
        const queryString = "SELECT * FROM developers";
        
        // La función ahora lanza una excepción si hay un error, 
        // y si es exitosa, retorna los datos.
        try {
            // Usamos execute para consultas SELECT/INSERT/UPDATE/DELETE
            const [rows] = await dbConn.execute(queryString);
            return rows;
        } catch (err) {
            // Lanzamos el error para que la capa superior (Routes) lo maneje
            console.error("Failed to query getAllDevelopers, err: ", err.message);
            throw new Error("Database query failed");
        }
    },

    // ----------------------------------------------------------------------
    // 2. OBTENER DESARROLLADOR POR ID (GET BY ID)
    // ----------------------------------------------------------------------
    async getDeveloperByIdParams(idType, idValue) { // Ya no recibe req, res
        const queryString =
            "SELECT * FROM developers WHERE id_type = ? AND id_value = ?";
        
        try {
            // Los parámetros se pasan como un array en el segundo argumento de execute
            const [rows] = await dbConn.execute(queryString, [idType, idValue]);
            return rows;
        } catch (err) {
            console.error("Failed to query getDeveloperByIdParams, err: ", err.message);
            throw new Error("Database query failed");
        }
    },

    // ----------------------------------------------------------------------
    // 3. CREAR DESARROLLADOR (POST)
    // El código original tenía dos queries anidadas (Buscar y Luego Insertar).
    // Con async/await, las hacemos secuenciales y planas (más legible).
    // ----------------------------------------------------------------------
    async createDeveloper(developerData) { // Recibe un objeto con los datos
        const checkQuery = "SELECT * FROM developers WHERE id_type = ? AND id_value = ?";
        
        try {
            // 1. Buscar si ya existe
            const [existingRows] = await dbConn.execute(checkQuery, [
                developerData.id_type,
                developerData.id_value,
            ]);

            if (existingRows.length) {
                // Usamos un Error personalizado para que la capa de Routes sepa que existe
                throw new Error("Developer already exists");
            }

            // 2. Insertar el nuevo desarrollador
            const insertQuery =
                "INSERT INTO developers (id_type, id_value, name, lastname, area, age) VALUES (?, ?, ?, ?, ?, ?)";
            
            const [insertResult] = await dbConn.execute(insertQuery, [
                developerData.id_type,
                developerData.id_value,
                developerData.name,
                developerData.lastname,
                developerData.area,
                developerData.age,
            ]);

            // Retornamos el resultado de la inserción (contiene 'affectedRows')
            return insertResult;

        } catch (err) {
            console.error("Failed to createDeveloper: ", err.message);
            throw err; // Lanzar el error para que la capa superior lo capture
        }
    },

    // ----------------------------------------------------------------------
    // 4. ACTUALIZAR DESARROLLADOR (PUT)
    // ----------------------------------------------------------------------
    async updateDeveloper(developerData) { // Recibe un objeto con todos los datos
        const queryString =
            "UPDATE developers SET name = ?, lastname = ?, area = ?, age = ? WHERE id_type = ? AND id_value = ?";

        try {
            const [result] = await dbConn.execute(queryString, [
                developerData.name,
                developerData.lastname,
                developerData.area,
                developerData.age,
                developerData.id_type,
                developerData.id_value,
            ]);
            return result;
        } catch (err) {
            console.error("Failed to updateDeveloper, err: ", err.message);
            throw new Error("Database query failed");
        }
    },

    // ----------------------------------------------------------------------
    // 5. ELIMINAR DESARROLLADOR (DELETE)
    // ----------------------------------------------------------------------
    async deleteDeveloper(idType, idValue) { // Ya no recibe req, res
        const queryString =
            "DELETE FROM developers WHERE id_type = ? AND id_value = ?";
        
        try {
            const [result] = await dbConn.execute(queryString, [idType, idValue]);
            return result; // Contiene 'affectedRows'
        } catch (err) {
            console.error("Failed to deleteDeveloper, err: ", err.message);
            throw new Error("Database query failed");
        }
    },
};

module.exports = model;