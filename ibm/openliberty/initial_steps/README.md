# Useful OpenLiberty Commands

These coomands are important for executing the OpenLiberty server.<br>
They should be run at the same level as the pom.xml.<br>

## Building and running the application

```bash
mvn liberty:run
```

## Starting and stopping the server

```bash
mvn liberty:start
```

```bash
mvn liberty:stop
```

## Updating the server configuration without restarting the server

```bash
mvn liberty:dev
```

# URLS for this simple Microservice

- http://localhost:9081/system/properties

- http://localhost:9081/health

# Source Files Explained

## SystemResource.java and SystemApplication.java

These files are the main Microservice logic, they create the REST-API
conditions and enable the path http://localhost:9081/system/properties .<br>

## SystemReadinessCheck.java

The SystemReadinessCheck class verifies that the system microservice is not in maintenance by checking a config property.<br>

This will be seen at the [health](http://localhost:9081/health) endpoint.<br>

## SystemLivenessCheck.java

The SystemLivenessCheck class reports a status of DOWN if the microservice
uses over 90% of the maximum amount of memory.<br>

This will be seen at the [health](http://localhost:9081/health) endpoint.<br>

# Configuration Files Explained

## server.xml

The server.xml enables us to configure the general settings for the OpenLiberty
server.<br>

For example, the "<feature>mpHealth-2.2</feature>" make it possible to have
health checks.<br>

# Log Files

## General Logs

The logs can be found in the following paths:

```txt
target/liberty/wlp/usr/servers/defaultServer/logs/console.log
target/liberty/wlp/usr/servers/defaultServer/logs
```

## Specific Java Packages Logs

To enable them, we can this in the server.xml (for desired package):
<logging traceSpecification="com.ibm.ws.microprofile.health.*=all" />

# Running OpenLiberty Microservice with Docker

## Creating the .war file

First of all, it is mandatory to create the ".war" file, with the following
command (using maven at the same level as the pom.xml):

```bash
mvn package
```

## Alternative 1: classic Docker image approach

We can build the Docker image with the Dockerfile, like this:

```bash
docker build -t openliberty-getting-started-santi:1.0-SNAPSHOT .
```

This will create the Docker image and we could then run the container with:

```bash
docker run -d --name ol-santi-microservice -p 9081:9081 openliberty-getting-started-santi:1.0-SNAPSHOT
```

To stop the container and remove it, we can do it with:

```bash
docker stop ol-santi-microservice
```

```bash
docker rm -f ol-santi-microservice
```

To remove the created Docker image, we can run:

```bash
docker rmi openliberty-getting-started-santi:1.0-SNAPSHOT
```

## Alternative 2: Docker-Compose approach

We can achieve the same results in a more "elegant" way with docker-compose.<br>

We can check the "docker-compose.yml" file, and see its configurations.<br>

To run the Microservice with Docker-Compose, we run:

```bash
docker-compose up --build
```

We can start/stop it with:

```bash
docker-compose start
docker-compose stop
```

We can remove it completely with:

```bash
docker-compose down
```
