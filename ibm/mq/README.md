# HOW TO RUN MQ CORRECTLY

## Overall functionalities explained

This is a simple IBM MQ (messaging and queuing middleware) with several modes of
operation point-to-point, publish/subscribe, file transfer, etc.<br>

It will run on top of a Docker container with a minimalistic setup. The purpose
is to ilustrate a simple MQ with Docker, that can be extrapolated to cloud-native
environments easily.<br>

## Running docker-compose to generate the magic

To run the docker-compose, we should be on the terminal, at the same level as the
docker-compose file inside the "mq" folder. <br>

After that, we can run de application in development environment like this:

### Development

```bash
docker-compose up
```

This should create and run the IBM MQ container with the conditions given on
the docker-compose.yml file <br>

To stop the containers, we can do it manually or we can run:

```bash
docker-compose down
```

## Verifying the IBM MQ

To test easy IBM-MQ commands, we can enter the container in an interactive
approach (with tty activated like this):

```bash
docker exec -it my_ibm_mq_santi_data bash
```

This should allow us to enter the container, and now, we can type the following
commands:

### Display MQ version

```bash
dspmqver
```

### Display details of queue managers

```bash
dspmq
```

### Enter browser to IBM-MQ console

* https://localhost:9443/ibmmq/console
