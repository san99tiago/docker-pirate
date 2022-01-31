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

## Cool Extra Tweaks

In this section, we can discover cool extra features that I developed to play with WAS servers...

Some of them are:

### Adding Things to PATH

We can enter the container and validate extra things, for example, there should be an extra configuration for the "PATH" variable related to the JRE bin path in the file (will be really useful for tools such as "keytool"):

```bash
~/.bashrc
```

The way in which I added this, is with the `add_jre_to_path.sh` that is copied into the container and it's executed in the Dockerfile at the image creation.

### Simple Jython Configurations (without input parameters)

Another important feature is to be able to execute Jython scripts with wsadmin.sh. These are created assuming that no parameters are passed to them.

The `add_custom_properties_web_container.py`, should be executed and it should add a couple of important WebContainer properties, that can be validated entering the IBM WAS Console at: https://localhost:9043/ibm/console  and going to this section:

--> Servers --> WebSphere application servers --> server1 --> Web Container Settings --> Web container --> Custom properties

And here, we should see these (Custom Properties orchestrated by our own files):

- trusthostheaderport=true
- com.ibm.ws.webcontainer.extractHostHeaderPort=true
- com.ibm.ws.webcontainer.disablexPoweredBy=true

> At this point, we are able to play with our servers with Jython files (executed by wsadmin tool) and Bash scripting with Shell files.

### Advanced Jython Configurations (with input parameters)

This part of the configurations require a basic understanding of Bash scripting. The first important file to notice is the `run_python_script_with_params.sh`. The main purpose of this file is to achieve the following pseudo-logic:

1. Configure WAS admin password (the one for `wsadmin` user located at `/tmp/passwordupdated`)
2. Initialize WAS server (in this case, the default one is `server1`)
3. Execute the custom Jython scripts with `wsadmin.sh` tool, passing the given input files and receiving "N" amount of parameters after (allowing the server to be configured with input variables and giving us extra tuning capabilities)
4. Stop WAS server
5. Change Owner and permissions for the /opt/IBM/* files

After understanding this file, we can read both `configure_jvm_heap_size.py` and `create_user_and_role_in_was_console.py` files:

- configure_jvm_heap_size.py --> Allows us to modify the default JVM configuration and desired values for the minHeap and maxHeap parameters.
- configure_jvm_heap_size.py --> Allows us to create a custom user (or validate that it exists), and then, add it to the wanted role for th IBM WAS console (it is common to add "monitor" users for the non-admin people that require access)

## How to create your custom Jython Scripts and Test them

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
