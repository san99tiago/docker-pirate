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
