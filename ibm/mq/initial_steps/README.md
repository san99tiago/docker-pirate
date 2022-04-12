# GENERAL MQ TIPS AND INFO

## Super Important Documentation

This tutorials and playgrounds are inspired by:

- [Install IBM MQ in a container | Set up messaging software in 4 minutes](https://youtu.be/xBX1P9OUteg)
- [IBM MQ Developer Essentials](https://developer.ibm.com/learningpaths/ibm-mq-badge/)
- [GitHub Repo: ibm-messaging/mq-container "developer config"](https://github.com/ibm-messaging/mq-container/blob/master/docs/developer-config.md)

## Overall functionalities explained

This is a simple IBM MQ (messaging and queuing middleware) with several modes of operation point-to-point, publish/subscribe, file transfer, etc.<br>

It will run on top of a Docker container with a minimalistic setup. The purpose is to ilustrate a simple MQ with Docker, that can be extrapolated to cloud-native environments easily.<br>

## Running docker-compose to generate the magic

To run the docker-compose, we should be on the terminal, at the same level as the docker-compose file inside the "initial_steps" folder. <br>

After that, we can run the application in development environment like this:

### Testing the app-queue with docker-compose

```bash
docker-compose up
```

This should create two services: "ibm_mq_santi" and "app_santi". <br>

The service called "ibm_mq_santi" will run the IBM MQ container with the configurations specified on the `my-custom-init-config.mqsc` script and in the `docker-compose.yml`, so that we can create a queue, and some extra configs for the correct functionalities of the Queue Manager on the container. <br>

The service called "app_santi" is a simple Java application that will be running inside another container and depends on the IBM Queue defined on the other service, to run properly. The application will be creating a "point-to-point" message structure to the queue called "DEV.SANTI.QL.1" via the given authentication methods and the channel "DEV.APP.SVRCONN".<br>

One important remark is that the Java application will be running "endlessly" and will add (and read) random messages to the queue at a constant rate.<br>

We can verify the correct functionalities by checking the logs of the java application or by going to the [IBM Console](https://localhost:9443/ibmmq/console) and checking the messages of the "DEV.SANTI.QL.1" (they should change constantly with the random messages generated at the app). <br>

<br>

Important notes about the "IBM Console" (after running  `docker-compose up --build`, you can play with this example):

- The default url to access the console is: (https://localhost:9443/ibmmq/console).
- The default user is `admin`.
- The default password ir `passw0rd`, but with the environment variable `MQ_ADMIN_PASSWORD` in the `docker-compose.yaml`, I changed it to `santi_admin_password`.
- There is another environment variable called `MQ_ENABLE_EMBEDDED_WEB_SERVER`, that when set to `false`, it disables the MQ-web-server.

The messages added/deleted to the queue, should look like this one:

**Santi says that your lucky number is: 537**

It is important to notice that these messages can be seen in the docker-compose logs, or we can interact directly with them from the IBM MQ Web Console, with the following steps:

- Entering to [IBM Console](https://localhost:9443/ibmmq/console).
- Authenticating with Username `admin` and Password `santi_admin_password`.
- Going to "Manage SANTI_QMGR".
- Accessing to the queue "DEV.SANTI.QL.1".
- Staying here and clicking "reload" option and enjoy as the app works by putting and getting messages (around every 10 seconds).


<br>

To stop the containers, we can do it manually or we can run:

```bash
docker-compose down
```

## Playing with the IBM MQ (inside the container)

To test easy IBM-MQ commands, we can enter the container in an interactive
approach (with tty activated like this):

```bash
docker exec -it my_ibm_mq_santi bash
```

One important directory to check is `/var/mqm`, because it contains multiple configurations for the MQ server.

The default most common paths to validate logs (and errors) is:

```bash
# Queue Manager error log directory
/var/mqm/qmgrs/SANTI_QMGR/errors/

# System error and Client error log directories
/var/mqm/errors/
```

Another important file is the configuration for the MQ-web-server, which is:

```bash
/opt/mqm/web/mq/samp/configuration
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
strmqm SANTI_QMGR
```

```bash
endmqm SANTI_QMGR
```

### Deleting MQ manually

```bash
dltmqm SANTI_QMGR
```

### Understanding main Java processes related to the QGMR

To show active IBM MQ processes that can be running on the system, we can run inside the GMQR container the following:

```bash
ps -fea | grep -i mq
```

This will show us multiple Linux-based processes (including the mqweb and more)

### Extra Santi's Tip

Please explore the QMGR configurations by yourself, you will learn a lots by "discovering" the files as an adventurer that is experiencing something new. One good way to start understanding the IBM/MQ DockerHub image is by listing the environment variables with:

```bash
env
```

Have fun!

### Validating the created MQ components with RUNMQSC

In order to interact with these components, feel free to open a terminal inside of the QMGR container, and then get the QMGR name with:

```bash
# Show the QMGR and its ports
dspmq -all
```

Then, with the QMGR name, execute:

```bash
runmqsc SANTI_QMGR
```

We are now inside the "MQ Scripting Tool" (activated by the "runmqsc" command). We can no run:

```bash
# Show all details for the current QMGR
DISPLAY QMGR ALL
```

```bash
# Display all queues on the QMGR
DISPLAY QUEUE(*)
```

```bash
# Show config for our created queue (the one with the name "DEV.SANTI.QL.1")
DISPLAY QUEUE(DEV.SANTI.QL.1)
```

```bash
# Display all channels on the QMGR
DISPLAY CHANNEL(*)
```

```bash
# Show config for our created APP and ADMIN channels ("DEV.APP.SVRCONN" and "DEV.ADMIN.SVRCONN")
DISPLAY CHANNEL(DEV.APP.SVRCONN)
DISPLAY CHANNEL(DEV.ADMIN.SVRCONN)
```

```bash
# Show all channel auth
DISPLAY CHLAUTH(*)
```

```bash
# Show config for our chlauth for APP and ADMIN channels ("DEV.APP.SVRCONN" and "DEV.ADMIN.SVRCONN")
DISPLAY CHLAUTH(DEV.APP.SVRCONN)
DISPLAY CHLAUTH(DEV.ADMIN.SVRCONN)
```

```bash
# Show all listeners on the QMGR
DISPLAY LISTENER(*)
```

```bash
# Show config for our created DEV listener ("DEV.LISTENER.TCP")
DISPLAY LISTENER(DEV.LISTENER.TCP)
```
