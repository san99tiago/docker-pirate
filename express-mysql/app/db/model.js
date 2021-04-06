const dbConn = require("../config/db.config");

const model = {
  getAllDevelopers(req, res) {
    const queryString = "SELECT * FROM developers";
    dbConn.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).end();
        return;
      }
      res.status(200).json(rows);
    });
  },

  getDeveloperByIdParams(req, res, idType, idValue) {
    const queryString =
      "SELECT * FROM developers WHERE (id_type = ? AND id_value = ?)";

    dbConn.query(queryString, [idType, idValue], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },

  createDeveloper(req, res) {
    let queryString =
      "SELECT * FROM developers WHERE (id_type = ? AND id_value = ?)";

    dbConn.query(
      queryString,
      [req.body.id_type, req.body.id_value],
      (err1, rows1, fields1) => {
        if (err1) {
          console.log("Failed to query, err1: ", err1);
          res.status(404).send('{"message":"Failed to query}');
          return;
        }
        if (rows1 && rows1.length) {
          console.log("Developer already exists.");
          res.status(404).send('{"message":"Developer already exists"}');
          return;
        }

        queryString =
          "INSERT INTO developers (id_type, id_value, name, lastname, area, age) VALUES (?, ?, ?, ?, ?, ?)";
        dbConn.query(
          queryString,
          [
            req.body.id_type,
            req.body.id_value,
            req.body.name,
            req.body.lastname,
            req.body.area,
            req.body.age,
          ],
          (err2, rows2, fields2) => {
            if (err2) {
              console.log("Failed to query, err2: ", err2);
              res.status(404).send();
              return;
            }
            res.status(200).json(rows2);
          }
        );
      }
    );
  },

  updateDeveloper(req, res) {
    const queryString =
      "UPDATE developers SET name = ?, lastname = ?, area = ?, age = ? WHERE (id_type = ? AND id_value = ?)";

    dbConn.query(
      queryString,
      [
        req.body.name,
        req.body.lastname,
        req.body.area,
        req.body.age,
        req.body.id_type,
        req.body.id_value,
      ],
      (err, rows, fields) => {
        if (err) {
          console.log("Failed to query, err: ", err);
          res.status(404).send('{"message":"Failed to query}');
          return;
        }
        res.status(200).json(rows);
      }
    );
  },

  deleteDeveloper(req, res, idType, idValue) {
    const queryString =
      "DELETE FROM developers WHERE (id_type = ? AND id_value = ?)";

    dbConn.query(queryString, [idType, idValue], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },
};

module.exports = model;
