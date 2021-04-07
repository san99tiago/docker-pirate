let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

// Assertion style and config
chai.should();
chai.use(chaiHttp);

describe("Test routes for REST-API", () => {
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
  });
});
