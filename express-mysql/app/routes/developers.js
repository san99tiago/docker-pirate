const express = require("express");
const router = express.Router();
const model = require("../db/model");

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

router.get("/developers", (req, res) => {
  model.getAllDevelopers(req, res);
});

router.get("/developers/:id_type/:id_value", (req, res) => {
  let idType = req.params.id_type;
  let idValue = req.params.id_value;

  model.getDeveloperByIdParams(req, res, idType, idValue);
});

router.post("/developers/:id_type/:id_value", (req, res) => {
  let idType = req.params.id_type;
  let idValue = req.params.id_value;

  if (isBodyValid(req) == false) {
    console.log("Body parameters must have valid values");
    res
      .status(404)
      .json({"message":"Body parameters must have valid values"});
    return;
  }

  if (idType != req.body.id_type || idValue != req.body.id_value) {
    console.log("Path and body parameters did not match");
    res
      .status(404)
      .json({"message":"Path and body parameters did not match"});
    return;
  }

  model.createDeveloper(req, res);
});

router.put("/developers/:id_type/:id_value", (req, res) => {
  let idType = req.params.id_type;
  let idValue = req.params.id_value;

  if (isBodyValid(req) == false) {
    console.log("Body parameters must have valid values");
    res
      .status(404)
      .json({"message":"Body parameters must have valid values"});
    return;
  }

  if (idType != req.body.id_type || idValue != req.body.id_value) {
    console.log("Path and body parameters did not match");
    res
      .status(404)
      .json({"message":"Path and body parameters did not match"});
    return;
  }

  model.updateDeveloper(req, res);
});

router.delete("/developers/:id_type/:id_value", (req, res) => {
  let idType = req.params.id_type;
  let idValue = req.params.id_value;

  model.deleteDeveloper(req, res, idType, idValue);
});

module.exports = router;
