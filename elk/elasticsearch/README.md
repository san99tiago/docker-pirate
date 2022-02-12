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
