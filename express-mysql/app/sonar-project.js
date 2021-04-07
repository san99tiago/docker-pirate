const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    // token: "",
    options: {
      "sonar.projectName": "SuperSimpleExpressExample",
      "sonar.projectVersion": "0.0.1",
      "sonar.projectDescription": "A simple app to apply a SonarQube",
      "sonar.projectKey": "SuperSimpleExpressExample:Test",
      "sonar.sources": "./app.js, ./db/model.js, ./config/db.config.js, ./routes/developers.js",
      "sonar.tests": "./test",
      "sonar.javascript.lcov.reportPaths": "reports/js/lcov.dat",
      // "sonar.inclusions": "./", // Entry point of your code
    },
  },
  () => {}
);
