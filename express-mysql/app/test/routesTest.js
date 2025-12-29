// test/routesTest.js

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const sinon = require("sinon");
const model = require("../db/model");

// Assertion style and config - ORDEN IMPORTANTE
chai.use(chaiHttp);
chai.should();

describe("Test routes for REST-API", () => {
  // Datos de prueba - Coinciden con los campos que espera la API
  const fakeDeveloper1 = {
    id_type: "cc",
    id_value: "007",
    name: "John",
    lastname: "Doe",
    area: "JavaScript",
    age: "30"
  };

  const incompleteFakeDeveloper1 = {
    id_type: "cc",
    id_value: "007",
    name: "John"
    // Faltan campos requeridos: lastname, area, age
  };

  const fakeDeveloper2 = {
    id_type: "ti",
    id_value: "008",
    name: "Jane",
    lastname: "Smith",
    area: "Python",
    age: "28"
  };

  // Respuestas simuladas de la base de datos
  const fakeCreateDeveloperGoodResponse = {
    affectedRows: 1,
    insertId: 1
  };

  const fakeUpdateDeveloperGoodResponse = {
    affectedRows: 1,
    changedRows: 1
  };

  const fakeDeleteDeveloperGoodResponse = {
    affectedRows: 1
  };

  // Restaurar stubs después de cada test
  afterEach(() => {
    sinon.restore();
  });

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
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          done();
        });
    });

    it("It should GET a 404 error", (done) => {
      chai
        .request(server)
        .get("/notfound")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it("It should GET a message with developers", (done) => {
      // Stub para simular la respuesta del modelo
      sinon
        .stub(model, "getAllDevelopers")
        .resolves([fakeDeveloper1, fakeDeveloper2]);

      chai
        .request(server)
        .get("/developers")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.should.have.lengthOf(2);
          response.body[0].should.have.property("name");
          response.body[0].should.have.property("area");
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
        .post("/wrongpath")
        .set("content-type", "application/json")
        .send({})
        .end((err, response) => {
          response.should.have.status(404);
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
          response.should.have.status(400);
          done();
        });
    });

    it("Correct POST of new developer should create a developer", (done) => {
      // Stub para simular creación exitosa
      sinon
        .stub(model, "createDeveloper")
        .resolves(fakeCreateDeveloperGoodResponse);

      chai
        .request(server)
        .post("/developers/cc/007")
        .set("content-type", "application/json")
        .send(fakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
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
        .put("/wrongpath")
        .set("content-type", "application/json")
        .send({})
        .end((err, response) => {
          response.should.have.status(404);
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
          response.should.have.status(400);
          done();
        });
    });

    it("Correct PUT should update a developer", (done) => {
      // Stub para simular actualización exitosa
      sinon
        .stub(model, "updateDeveloper")
        .resolves(fakeUpdateDeveloperGoodResponse);

      chai
        .request(server)
        .put("/developers/cc/007")
        .set("content-type", "application/json")
        .send(fakeDeveloper1)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          done();
        });
    });
  });

  /**
   * Test the DELETE route "/"
   */
  describe("DELETE /", () => {
    it("DELETE should get a correct response body", (done) => {
      // Stub para simular eliminación exitosa
      sinon
        .stub(model, "deleteDeveloper")
        .resolves(fakeDeleteDeveloperGoodResponse);

      chai
        .request(server)
        .delete("/developers/cc/007")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          done();
        });
    });
  });
});