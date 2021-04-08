const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const sinon = require("sinon");
const model = require("../db/model");

// Assertion style and config
chai.should();
chai.use(chaiHttp);

describe("Test routes for REST-API", () => {
  const fakeDeveloper1 = {
    id: 1,
    id_type: "cc",
    id_value: "007",
    name: "SuperSanti",
    lastname: "SuperGarci",
    area: "DevOps",
    age: 99,
  };

  const incompleteFakeDeveloper1 = {
    id: 1,
    id_type: "cc",
    id_value: "007",
    name: "SuperSanti",
  };

  const fakeDeveloper2 = {
    id: 1,
    id_type: "cc",
    id_value: "0077",
    name: "SuperMarlon",
    lastname: "SuperGonzalez",
    area: "DevOps",
    age: 99,
  };

  const fakeCreateDeveloperGoodResponse = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 999,
    serverStatus: 2,
    warningCount: 0,
    message: "",
    protocol41: true,
    changedRows: 1,
  };

  const fakeUpdateDeveloperGoodResponse = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: "(Rows matched: 1  Changed: 1  Warnings: 0",
    protocol41: true,
    changedRows: 1,
  };

  const fakeDeleteDeveloperGoodResponse = {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 34,
    warningCount: 0,
    message: "",
    protocol41: true,
    changedRows: 1,
  };


  /**
   * Test the GET route "/"
   */
  describe("GET /", () => {
    it("It should GET a sample message", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("message");
          done();
        });
    });

    it("It should GET a 404 error", (done) => {
      chai
        .request(server)
        .get("/weird-path")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it("It should GET a message with developers", (done) => {
      function fakeGetAllDevelopers(req, res) {
        res.status(200).json([fakeDeveloper1, fakeDeveloper2]);
      }

      sinon.replace(model, "getAllDevelopers", fakeGetAllDevelopers);

      chai
        .request(server)
        .get("/developers")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.lengthOf(2);
          response.body[0].should.have.property("id");
          response.body[0].should.have.property("id_type");
          response.body[0].should.have.property("id_value");
          response.body[0].should.have.property("name");
          response.body[0].should.have.property("lastname");
          response.body[0].should.have.property("area");
          response.body[0].should.have.property("age");
          response.body[1].should.have.property("id");
          response.body[1].should.have.property("id_type");
          response.body[1].should.have.property("id_value");
          response.body[1].should.have.property("name");
          response.body[1].should.have.property("lastname");
          response.body[1].should.have.property("area");
          response.body[1].should.have.property("age");
          done();
        });
    });
  });

  /**
   * Test the POST route "/"
   */
  describe("POST /", () => {
    it("Wrong POST body and path params should get a 404 error and message", (done) => {
      chai
        .request(server)
        .post("/developers/cc/0") // Params between body and path DON'T match
        .set("content-type", "application/json")
        .send(fakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("message");
          done();
        });
    });

    it("Wrong POST incomplete body should get a 404 error and message", (done) => {
      chai
        .request(server)
        .post("/developers/cc/007")
        .set("content-type", "application/json")
        .send(incompleteFakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("message");
          done();
        });
    });

    it("Correct POST of new developer should create a developer", (done) => {
      function fakeCreateDeveloper(req, res) {
        res.status(200).json(fakeCreateDeveloperGoodResponse);
      }

      sinon.replace(model, "createDeveloper", fakeCreateDeveloper);

      chai
        .request(server)
        .post("/developers/cc/007")
        .set("content-type", "application/json")
        .send(fakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("changedRows");
          done();
        });
    });
  });

  /**
   * Test the PUT route "/"
   */
  describe("PUT /", () => {
    it("Wrong PUT body and path params should get a 404 error and message", (done) => {
      chai
        .request(server)
        .put("/developers/cc/0") // Params between body and path DON'T match
        .set("content-type", "application/json")
        .send(fakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("message");
          done();
        });
    });

    it("Wrong PUT incomplete body should get a 404 error and message", (done) => {
      chai
        .request(server)
        .put("/developers/cc/007")
        .set("content-type", "application/json")
        .send(incompleteFakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property("message");
          done();
        });
    });

    it("Correct PUT should update a developer", (done) => {
      function fakeUpdateDeveloper(req, res) {
        res.status(200).json(fakeUpdateDeveloperGoodResponse);
      }

      sinon.replace(model, "updateDeveloper", fakeUpdateDeveloper);

      chai
        .request(server)
        .post("/developers/cc/007")
        .set("content-type", "application/json")
        .send(fakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("changedRows");
          done();
        });
    });
  });

  /**
   * Test the DELETE route "/"
   */
  describe("DELETE /", () => {
    it("DELETE should get a correct response body", (done) => {
      function fakeDeleteDeveloper(req, res) {
        res.status(200).json(fakeDeleteDeveloperGoodResponse);
      }

      sinon.replace(model, "deleteDeveloper", fakeDeleteDeveloper);

      chai
        .request(server)
        .delete("/developers/cc/007")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("changedRows");
          done();
        });
    });
  });
});
