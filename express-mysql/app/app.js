// express-mysql/app/app.js (CÓDIGO CORREGIDO)
const express = require("express");
const morgan = require("morgan");
const developerRoutes = require("./routes/developers"); 
const app = express();

app.use(express.json()); // Necesario para POST/PUT
app.use(morgan("tiny"));
app.use("/", developerRoutes);

// Manejador de ruta por defecto
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the REST API example!" });
});

// Middleware para manejar rutas 404
app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// Exporta la aplicación Express, pero NO la inicia
module.exports = app;

// Solo inicia el servidor si el archivo se ejecuta directamente (no por los tests)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}