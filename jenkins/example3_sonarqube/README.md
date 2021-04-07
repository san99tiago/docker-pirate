# HOW TO RUN JENKINS + SONARQUBE CONTAINERS CORRECTLY

First of all, this folder is the one that will host the SonarQube data
from the run container. <br>

## Running docker-compose to generate the magic

To run the docker-compose, we should be on the terminal, at the same level as the
docker-compose file inside the "jenkins-sonarqube-docker" folder. <br>
After that, we run:

```bash
docker-compose up
```

<br>

This should create and run the specified containers. <br>

To stop the containers, we can do it manually or we can run:

```bash
docker-compose down
```

<br>

## Important Info

The volumes for the docker-container are specified in two ways: <br>

- Docker named volume for Jenkins
- Docker path volume for SonarQube (that's why we added it to the gitignore)
