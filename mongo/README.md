# MONGODB EXAMPLE SOLUTIONS

## How to Run Example?

### Start Docker Container Services with Docker-Compose Tool

The following commands are the simplest way to start the services based on an input docker-compose file:

```bash
# Solution 1 (Run only a MongoDB image without mongo-express web browser)
docker-compose --file docker-compose-standalone.yml up

# Solution 2 (Run MongoDB image with an additional image of mongo-express web browser enabled)
docker-compose --file docker-compose-with-mongo-express.yml up
```

### Stop/Delete Docker Container Services with Docker-Compose Tool

The following commands illustrate how to stop/delete the solution based on the selected docker-compose file:

```bash
# Stop/Delete Solution 1
docker-compose --file docker-compose-standalone.yml stop
docker-compose --file docker-compose-standalone.yml down

# Stop/Delete Solution 2
docker-compose --file docker-compose-with-mongo-express.yml stop
docker-compose --file docker-compose-with-mongo-express.yml down
```

### Remark about the MongoDB Storage/Volume

As these solutions use a "Docker Volume" strategy to save the MongoDB data, you might want to delete it or destroy the volume in the future. To do so (remember that it could be dangerous as data could be lost), execute:

```bash
# Destroy the associated Docker Volume that has MongoDB data on it
docker volume rm example_mymongodb_volume
```

## Important Tools to connect with MongoDB

There are 2 main "direct" ways to interact with MongoDB. One is "compass" with a GUI approach, and the other is a "shell" with a terminal approach. Both are really useful and the necessary binaries or tools can be found at these links:

- https://www.mongodb.com/try/download/compass
- https://www.mongodb.com/try/download/shell

## Example MongoDB Connection String

Based on the parameters of the `docker-compose.yml`, we can use the following string to connect to mongodb:

```txt
mongodb://admin:password@localhost:27017/
```

## Example MongoDB Shell Commands

### Show Databases

```bash
show dbs
```

```txt
admin           100.00 KiB
config           60.00 KiB
database_santi   92.00 KiB
local            72.00 KiB
```

### Use a Database

```bash
use database_santi
```

```txt
switched to db database_santi
```

### Show Collections inside a Database

```bash
show collections
```

```txt
collection_santi
delete_me
```

###

```bash

```

```txt

```

###

```bash

```

```txt

```

###

```bash

```

```txt

```

###

```bash

```

```txt

```

###

```bash

```

```txt

```
