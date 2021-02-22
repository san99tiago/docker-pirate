# Example 1 with Docker

## What are we Building?

We are developing a simple Node example of an app that connects to a MongoDB database (from another Docker container) and maps the response to show if the DB is correctly connected. The overall project will have 2 containers connected in a docker-network.

## How to Build the Docker's Image for the App?

From the specific file of the project in the terminal, we run:

```bash
docker build -t helloapp .
```

After this is run, a result Docker image should be created with the name "helloapp".

## How to Run the App Without MongoDB's Container Connected?

After the image is created, we run the container with:

```bash
docker run --rm --name myhelloapp -p 3000:3000 helloapp
```

If it is connected to the other's container for MongoDB, it should return on [localhost:3000](http://localhost:3000)  "Connection OK!", otherwise, it should return "ERROR -→ error message".

In the next steps, we explain how to connect the containers correctly, so that we can run the app with MongoDB ok.

## How to Run the MongoDB's Container?

After the image is created, we run the container with:

```bash
docker run -d --name mymongodb mongo
```

## How to Create the Network for Connecting Containers?

First of all, we should work on creating our own network for the project:

```bash
docker network create --attachable santinet
```

- Remember that we can check for existing docker networks with "docker network ls".

After we connect the containers to the network, we can verify if they are correctly attached with:

```bash
docker network inspect santinet
```

## How to Connect MongoDB's Container to the Network?

Now, we connect the containers to the created network "santinet", so that we can have MongoDB connected to the main app from another container.

```bash
docker network connect santinet mymongodb
```

## How to Run the App With MongoDB's Container Connected?

After the image is created, we run the container with:

```bash
docker run -d --name myhelloapp -p 3000:3000 `
--env MONGO_URL=mongodb://mymongodb:27017/test helloapp
```

- "-d" or "—detached": run container detached.
- "—name myhelloapp": name my container.
- "-p" or "—publish": publish ports.
- "3000:3000": setting the ports to be 3000 in both host and container.
- "-e" or "—env": set environment variables.
- "MONGO_URL=mongodb://mymongodb:27017/test": setting the environment variable for MONGO_URL to correctly get it in the express app for the database (in index.js).
- "helloapp": docker created image to be run.

Remark: keep in mind that "mymongodb" has to be in the path for the mongodb connection, because we give it the name of the container that is running mongo.

The final step, is to connect the app to the created network, so that we can connect "myhelloapp" with "mymongodb" containers in the network:

```bash
docker network connect santinet myhelloapp
```

If we followed the steps successfully, we should be getting a "Connection OK!" as a response for [localhost:3000](http://localhost:3000) !!!

---