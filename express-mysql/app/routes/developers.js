// routes/developers.js
const express = require("express");
const router = express.Router();
const model = require("../db/model"); // Modelo migrado a Promesas/async

// La función de validación del cuerpo sigue siendo válida, no requiere cambios.
function isBodyValid(req) {
  return (
    req.body.id_type != "" &&
    req.body.id_type != null &&
    req.body.id_value != "" &&
    req.body.id_value != null &&
    req.body.name != "" &&
    req.body.name != null &&
    req.body.lastname != "" &&
    req.body.lastname != null &&
    req.body.area != "" &&
    req.body.area != null &&
    req.body.age != "" &&
    req.body.age != null
  );
}

// ----------------------------------------------------------------------
// 1. OBTENER TODOS LOS DESARROLLADORES (GET /developers)
// ----------------------------------------------------------------------
// La función del manejador de rutas debe ser 'async'
router.get("/developers", async (req, res) => {
  try {
    // Usamos 'await' para obtener directamente el array de resultados del modelo
    const developers = await model.getAllDevelopers(); 
    
    // Manejamos la respuesta HTTP aquí, en la capa de Rutas
    res.status(200).json(developers);

  } catch (error) {
    // Capturamos cualquier error lanzado por el modelo (ej: fallo de conexión a DB)
    console.error("Error in GET /developers:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ----------------------------------------------------------------------
// 2. OBTENER DESARROLLADOR POR ID (GET /developers/:id_type/:id_value)
// ----------------------------------------------------------------------
router.get("/developers/:id_type/:id_value", async (req, res) => {
  const idType = req.params.id_type;
  const idValue = req.params.id_value;

  try {
    // El modelo ya no necesita req, res
    const developers = await model.getDeveloperByIdParams(idType, idValue);

    if (developers.length === 0) {
      return res.status(404).json({ message: "Developer not found." });
    }

    res.status(200).json(developers[0]); // Retorna el primer resultado

  } catch (error) {
    console.error("Error in GET /developers/:id:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ----------------------------------------------------------------------
// 3. CREAR DESARROLLADOR (POST /developers/:id_type/:id_value)
// ----------------------------------------------------------------------
router.post("/developers/:id_type/:id_value", async (req, res) => {
  const idType = req.params.id_type;
  const idValue = req.params.id_value;
  
  // Validaciones de cuerpo y parámetros (se mantienen)
  if (!isBodyValid(req) || idType !== req.body.id_type || idValue !== req.body.id_value) {
    const message = "Path and body parameters must match and be valid.";
    console.log(message);
    return res.status(400).json({ message: message }); // Usamos 400 Bad Request
  }
  
  // Extraemos los datos del body que necesitamos
  const developerData = req.body;

  try {
    // El modelo recibe solo los datos
    const result = await model.createDeveloper(developerData);
    
    // 201 Created es más apropiado para POST exitoso
    res.status(201).json({ 
      message: "Developer created successfully.",
      affectedRows: result.affectedRows 
    });

  } catch (error) {
    console.error("Error in POST /developers:", error.message);
    
    // Manejamos el error específico de duplicado que definimos en model.js
    if (error.message.includes("already exists")) {
      return res.status(409).json({ message: "Developer already exists." }); // 409 Conflict
    }

    res.status(500).json({ message: "Internal server error during creation." });
  }
});

// ----------------------------------------------------------------------
// 4. ACTUALIZAR DESARROLLADOR (PUT /developers/:id_type/:id_value)
// ----------------------------------------------------------------------
router.put("/developers/:id_type/:id_value", async (req, res) => {
  const idType = req.params.id_type;
  const idValue = req.params.id_value;
  
  // Validaciones de cuerpo y parámetros (se mantienen)
  if (!isBodyValid(req) || idType !== req.body.id_type || idValue !== req.body.id_value) {
    const message = "Path and body parameters must match and be valid.";
    console.log(message);
    return res.status(400).json({ message: message }); // Usamos 400 Bad Request
  }
  
  const developerData = req.body;

  try {
    const result = await model.updateDeveloper(developerData);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Developer not found for update." });
    }

    res.status(200).json({ 
      message: "Developer updated successfully.",
      affectedRows: result.affectedRows 
    });

  } catch (error) {
    console.error("Error in PUT /developers:", error.message);
    res.status(500).json({ message: "Internal server error during update." });
  }
});

// ----------------------------------------------------------------------
// 5. ELIMINAR DESARROLLADOR (DELETE /developers/:id_type/:id_value)
// ----------------------------------------------------------------------
router.delete("/developers/:id_type/:id_value", async (req, res) => {
  const idType = req.params.id_type;
  const idValue = req.params.id_value;

  try {
    const result = await model.deleteDeveloper(idType, idValue);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Developer not found for deletion." });
    }

    res.status(200).json({ 
      message: "Developer deleted successfully.",
      affectedRows: result.affectedRows 
    });

  } catch (error) {
    console.error("Error in DELETE /developers:", error.message);
    res.status(500).json({ message: "Internal server error during deletion." });
  }
});

module.exports = router;