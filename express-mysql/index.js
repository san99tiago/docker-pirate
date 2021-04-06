const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

app.use(morgan("short"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/developers", (req, res) => {
  res.send([
    { name: "Santiago", lastname: "Garcia", id_type: "cc", id_value: "1234" },
    { name: "Monica", lastname: "Hill", id_type: "cc", id_value: "2222" },
    { name: "Elkin", lastname: "Guerra", id_type: "cc", id_value: "3333" },
    { name: "Melissa", lastname: "Mejia", id_type: "cc", id_value: "4444" },
    { name: "Yesid", lastname: "Palencia", id_type: "cc", id_value: "5555" },
  ]);
});

app.get("/developers/cc/4444", (req, res) => {
  res.send([
    { name: "Melissa", lastname: "Mejia", id_type: "cc", id_value: "4444" },
  ]);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
