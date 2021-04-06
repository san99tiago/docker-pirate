# Example 3 with Docker

## What are we Building?

We are developing a simple Node example of an app that connects to a MongoDB database (from another Docker container) and maps the response to show if the DB is correctly connected. The overall project will have 2 containers connected in a docker-network.

The main goal of this example, is to create the container's connection with the "docker-compose.yml" file, instead of the manual connections seen on example 1.

## What is the Difference From Example 2?

Now we wont have to create the image before (we can tell docker to build it in the docker-compose.yml).

## How to Run Example?


```bash
docker-compose build

docker-compose up -d

```
- "docker-compose build": is to build specified images in docker-compose.yml.
- "docker-compose up -d": is to run the docker-compose.yml file.

As we can see, this process is way easier than the manual one. To see correct result, enter [localhost:3000](http://localhost:3000) and it should return "Connection OK!".

Finally, we should be able to stop or completely delete the composed features.<br>

To do so, we run:

```bash
docker-compose stop

docker-compose down
```

---