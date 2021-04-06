# Example 2 with Docker

## What are we Building?

We are developing a simple Node example of an app that connects to a MongoDB database (from another Docker container) and maps the response to show if the DB is correctly connected. The overall project will have 2 containers connected in a docker-network.

The main goal of this example, is to create the container's connection with the "docker-compose.yml" file, instead of the manual connections seen on example 1.

## What is the Difference From Example 1?

Now we will have a "docker-compose.yml" file that helps us attach the container's to a network and handle container's services/dependencies in an easy way.

## How to Run Example?

From the specific file of the project in the terminal, we run:

```bash
docker build -t helloapp .
```

After this is run, a result Docker image should be created with the name "helloapp".

```bash
docker-compose up
```

As we can see, this process is way easier than the manual one. To see correct result, enter [localhost:3000](http://localhost:3000) and it should return "Connection OK!".

Finally, we should be able to stop or completely delete the composed features.<br>

To do so, we run:

```bash
docker-compose stop

docker-compose down
```

---