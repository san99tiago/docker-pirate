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

These are multiple useful "low-level" MongoDB shell commands for playing with different Mongo functionalities. <br>

Note: there are a lot of commands, but these are just some common examples.

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

### Create Collections inside a Database

```bash
db.createCollection("collection_santi_1")
db.createCollection("collection_santi_2")
```

```txt
{ ok: 1 }
{ ok: 1 }
```

### Show Collections inside a Database

```bash
show collections
```

```txt
collection_santi_1
collection_santi_2
```

### Insert Document in Collection

```bash
db.collection_santi_1.insertOne({"name": "Santiago", "lastname": "Garcia", "role": "DevOps"})
```

```txt
{
  acknowledged: true,
  insertedId: ObjectId("63c8ac72cc6d66bbbf6c1586")
}
```

### Insert multiple Documents in Collection at Once

```bash
db.collection_santi_1.insertMany(
  [
    {"name": "Alex", "lastname": "Hormozi", "role": "Founder", "company": "https://www.acquisition.com"},
    {"name": "Leila", "lastname": "Hormozi", "role": "CEO", "company": "https://www.acquisition.com"},
  ]
)
```

```txt
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("63c8ac85cc6d66bbbf6c1587"),
    '1': ObjectId("63c8ac85cc6d66bbbf6c1588")
  }
}
```

### Show All Collection's Documents

```bash
db.collection_santi_1.find()
```

```txt
{
  _id: ObjectId("63c8ac72cc6d66bbbf6c1586"),
  name: 'Santiago',
  lastname: 'Garcia',
  role: 'DevOps'
}
{
  _id: ObjectId("63c8ac85cc6d66bbbf6c1587"),
  name: 'Alex',
  lastname: 'Hormozi',
  role: 'Founder',
  company: 'https://www.acquisition.com'
}
{
  _id: ObjectId("63c8ac85cc6d66bbbf6c1588"),
  name: 'Leila',
  lastname: 'Hormozi',
  role: 'CEO',
  company: 'https://www.acquisition.com'
}
```

### Query Collection's Documents with Specific Filter

```bash
db.collection_santi_1.find({"lastname": "Hormozi"})
```

```txt
{
  _id: ObjectId("63c8bcf7cc6d66bbbf6c158a"),
  name: 'Alex',
  lastname: 'Hormozi',
  role: 'Founder',
  company: 'https://www.acquisition.com'
}
{
  _id: ObjectId("63c8bcf7cc6d66bbbf6c158b"),
  name: 'Leila',
  lastname: 'Hormozi',
  role: 'CEO',
  company: 'https://www.acquisition.com'
}
```

### Query Collection's Documents with Specific Filter and Restrict Output Keys/Values

```bash
db.collection_santi_1.find({"lastname": "Hormozi"}, {name: 1, lastname: 1})
```

```txt
{
  _id: ObjectId("63c8bcf7cc6d66bbbf6c158a"),
  name: 'Alex',
  lastname: 'Hormozi'
}
{
  _id: ObjectId("63c8bcf7cc6d66bbbf6c158b"),
  name: 'Leila',
  lastname: 'Hormozi'
}
```

### Count the Number of Documents in a Collection

```bash
db.collection_santi_1.countDocuments()
```

```txt
3
```

### Create or Update an existing Document based on a Known "key" value(s)

```bash
# Option 1 (giving only one key as identifier, in this case "name")
db.collection_santi_1.updateOne({name: "Santiago"}, {$set: {"company": "Santiago Garcia Arango Tech"}}, {upsert: true})

# Option 2 (giving multiple values as identifiers, in this case "name" and "lastname")
db.collection_santi_1.updateOne({name: "Santiago", lastname: "Garcia"}, {$set: {"company": "Santiago Garcia Arango Tech"}}, {upsert: true})
```

```txt
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

### Delete existing Document based on known "key" value(s)

```bash
# Option 1 (giving only one key as identifier, in this case "name")
db.collection_santi_1.deleteOne({name: "Santiago"})

# Option 2 (giving multiple values as identifiers, in this case "name" and "lastname")
db.collection_santi_1.deleteOne({name: "Santiago", lastname: "Garcia"})
```

```txt
{
  acknowledged: true,
  deletedCount: 1
}
```

### Delete Collection and its Documents (Warning: data loss)

```bash
db.collection_santi_1.drop()
```

```txt
true
```
