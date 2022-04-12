# ELASTICSEARCH DOCKER-COMPOSE USAGE

This is an example of how to run locally Elasticserach functionalities.<br>

To run the the service (es01) with `docker-compose.yaml`, we can execute:

```bash
docker-compose up --build
```

If you ever need for force the build, without cache and extra logs, you can run:

```bash
docker-compose --verbose build --no-cache
```

To end the elasticsearch service, we can run:

```bash
docker-compose down
```

## Entering the container

If we want to go inside the container, we can run:

```bash
docker exec -it my_elasticsearch bash
```

And then, we can see the elasticsearch processes with:

```bash
ps -fea | grep -v grep | grep -i elastic
```

## Postman collection to play with elasticsearch

Feel free to open the `ELASTICSEARCH_2.postman_collection.json` and have some fun with different HTTP methods that interact with elasticsearch functionalities.

<br>

Some sample requests and responses are saved in `requests_responses` directory.


## Amazing examples

Please explore the special search queries (responses 06, 07, 08) that are in the `requests_responses` file, because we can see the responses with specific "scores" that replicate how a real search engine works and sends the most fittable answers first.

## Common Error

When initializing the container with docker-compose, it is common to see an error similar to this one:

```txt
ERROR: [1] bootstrap checks failed. You must address the points described in the following [1] lines before starting Elasticsearch.
exited with code 78.
```

To solve this problem, you can enter the WSL (or directly open the Linux Distribution), and run:

```bash
sudo sysctl -w vm.max_map_count=262144
```

This should remove the bootstrap problem easily.
