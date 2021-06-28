# GENERAL MQ TIPS AND INFO

## Overall functionalities explained

This is a simple IBM MQ (messaging and queuing middleware) with several modes of
operation point-to-point, publish/subscribe, file transfer, etc.<br>

It will run on top of a Docker container with a minimalistic setup. The purpose
is to ilustrate a simple MQ with Docker, that can be extrapolated to cloud-native
environments easily.<br>

## Running docker-compose to generate the magic

To run the docker-compose, we should be on the terminal, at the same level as the
docker-compose file inside the "initial_steps" folder. <br>

After that, we can run the application in development environment like this:

### Testing the app-queue with docker-compose

```bash
docker-compose up
```

This should create two services: "ibm_mq_santi_data" and "app_santi". <br>

The service called "ibm_mq_santi_data" will run the IBM MQ container with the 
configurations specified on the "20-config.mqsc" script and in the 
docker-compose.yml, so that we create a queue, and some extra configs for the 
correct functionalities of the Queue Manager on the container. <br>

The service called "app_santi" is a simple Java application that will be 
running inside another container and depends on the IBM Queue defined on the 
other service, to run properly. The application will be creating a 
"point-to-point" message structure to the queue called "DEV.SANTI.QL.1" via the 
given authentication methods and the channel "DEV.APP.SVRCONN".<br>

One important remark is that the Java application will be running "endlessly" 
and will add (and read) random messages to the queue at a constant rate.<br>

We can verify the correct functionalities by checking the logs of the java 
application or by going to the [IBM Console](https://localhost:9443/ibmmq/console) 
and checking the messages of the "DEV.SANTI.QL.1" (they should change constantly 
with the random messages generated at the app). <br>

The messages added/deleted to the queue, should look like this one:

**Santi says that your lucky number is: 537**

<br>

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

```bash
dspmq -o all
```

### Starting/Stopping MQ manually

```bash
strmqm QM1
```

```bash
endmqm QM1
```

### Deleting MQ manually

```bash
dltmqm QM1
```
