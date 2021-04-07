const express = require("express");
const morgan = require("morgan");

const app = express();
const router = require("./routes/developers.js");

const PORT = process.env.APP_PORT || 3000;

app.disable("etag"); // Disable cache 304 status-code
app.use(morgan("short")); // Log server requests
app.use(express.json()); // Parse JSON bodies (legacy was body-parser)
app.use(router); // Expand routes functionalities with custom router

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, My name is Santiago." });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
