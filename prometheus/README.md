# PROMETHEUS DOCKER-COMPOSE USAGE

This is a simple example that exposes Prometheus metrics via the official [DockerHub Prometheus Image](https://hub.docker.com/r/prom/prometheus).

<br>

## Running the example

To execute the `docker-compose.yaml` file, you must be at the same level and run:

```bash
docker-compose up --build
```

And to delete the execution you can run:

```bash
docker-compose down
```

<br>

## Validating the default Prometheus endpoints

By default, the `prometheus.yml` configuration file has the scraping over itself, so it is collecting its own metrics as an example of how prometheus would work in other targets. <br>

After this, feel free to open a browser and explore the following links:

- [localhost:9090/metrics](localhost:9090/metrics)
- [localhost:9090/graph](localhost:9090/graph)

In the metrics endpoint, you should be able to see the exported metric of `prometheus_target_interval_length_seconds `, which has information about its values, sum and total counts.

In the graph endpoint, you should be able to execute a couple of queries in the `Table` and `Graph` sections, for example:

- `prometheus_target_interval_length_seconds`
- `prometheus_target_interval_length_seconds{quantile="0.99"}`
- `rate(prometheus_tsdb_head_chunks_created_total[1m])`


## What about inside the Prometheus container?

To understand what is happening inside, you can enter the container with:

```bash
docker exec -it my_prometheus sh
```

Now that we are inside, we can validate the `prometheus.yml` file with:

```bash
cat /etc/prometheus/prometheus.yml
```

We can also check the main Prometheus process and its flags with:

```bash
ps -fea | grep -i prom
```

We should also be able to see the exported Prometheus ports with:

```bash
netstat -putan
```

## Further Steps

To keep playing around with Prometheus, feel free to visit the official GitHub repository at [prometheus/prometheus](https://github.com/prometheus/prometheus) and the selected examples at [prometheus/documentation/examples](https://github.com/prometheus/prometheus/tree/main/documentation/examples).

