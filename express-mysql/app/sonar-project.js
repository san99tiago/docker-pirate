const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: process.env.SONARQUBE_HOST || "http://localhost:9000",
    // token: "",
    options: {
      "sonar.projectName": "SuperSimpleExpressExample",
      "sonar.projectVersion": "0.0.1",
      "sonar.projectDescription": "A simple app to apply a SonarQube",
      "sonar.projectKey": "SuperSimpleExpressExample:Test",
      "sonar.sources":
        "./app.js, ./config/db.config.js, ./routes/developers.js",
      "sonar.tests": "./test",
      "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
      // "sonar.inclusions": "./", // Entry point of your code
    },
  },
  () => {}
);
