# WAS TRADITIONAL FULL-PROFILE

This is an example of how to run locally a complete Full-Profile IBM WAS with
Docker functionalities.<br>

To run the IBM WAS example, we can execute:

```bash
docker-compose up --build
```

If you ever need for force the build, without cache and extra logs, you can run:

```bash
docker-compose --verbose build --no-cache
```

To end the Websphere Application Server, we run:

```bash
docker-compose down
```

## Login to the IBM Console

The IBM Websphere Application Server Console is the GUI to interact with the
current state of the WAS.<br>

To enter to the login page, we can go to the following path in our browser:

- https://localhost:9043/ibm/console

The user is **wsadmin** and the password can be retrieved from the container...<br>

To get the password, we can enter the Docker container, by running:

```bash
docker exec -it my_ibm_was_traditional bash
```

And then, we can retrieve the password with:

```bash
cat tmp/PASSWORD
```
