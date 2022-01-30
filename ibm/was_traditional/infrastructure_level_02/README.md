# WAS TRADITIONAL FULL-PROFILE

This is an example of how to run locally a complete Full-Profile IBM WAS with
Docker functionalities.<br>

To run the IBM WAS example, we can execute:

```bash
docker-compose up --build
```

To end the Websphere Application Server, we run:

```bash
docker-compose down
```

## Login to the IBM Console

The IBM Websphere Application Server Console is the GUI to interact with the
current state of the WAS.<br>

To enter to the login page, we can go to the following path in our browser:

- https://localhost:9043/ibm/console/login.do

The user is **wsadmin** and the password can be retrieved from the container...<br>

To get the password, we can enter the Docker container, by running:

```bash
docker exec -it my_ibm_was_traditional bash
```

And then, we can retrieve the password with:

```bash
cat tmp/PASSWORD
```

We can also enter the container and validate extra things, for example, there should be an extra configuration for the "PATH" variable related to the JRE bin path in the file (will be really useful for tools such as "keytool"):

```bash
~/.bashrc
```

The `add_custom_properties_web_container.py`, should be executed and it should add a couple of important WebContainer properties, that can be validated entering the IBM WAS Console at: https://localhost:9043/ibm/console  and going to this section:

--> Servers --> WebSphere application servers --> server1 --> Web Container Settings --> Web container --> Custom properties

And here, we should see these (Custom Properties orchestrated by our own files):

- trusthostheaderport=true
- com.ibm.ws.webcontainer.extractHostHeaderPort=true
- com.ibm.ws.webcontainer.disablexPoweredBy=true

At this point, we are able to play with our servers with Jython files (executed by wsadmin tool) and Bash scripting with Shell files.

To interact with wsadmin.sh inside the container, we can execute:

```bash
docker exec -it my_ibm_was_traditional bash
```

And then, run:

```bash
wsadmin.sh -lang jython -user wsadmin -password $(cat /tmp/passwordupdated)
```

This will start a SOAP connection with WSADMIN scripting language, based on the default user and its password.

To run a file, you can run:

```bash
wsadmin.sh -lang jython -user wsadmin -password $(cat /tmp/passwordupdated) -f /tmp/path_to_file
```

> Now we can configure the server however we want!
