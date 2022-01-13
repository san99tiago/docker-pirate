import os
import peewee
import json
from playhouse.shortcuts import model_to_dict


database = peewee.MySQLDatabase(
    "employees",
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", 3306)),
    user=(os.getenv("DB_USER", "root")),
    password=(os.getenv("DB_PASSWORD", "root"))
)

class DevelopersORM(peewee.Model):
    name = peewee.CharField(255)
    lastname = peewee.CharField(255)
    id_type = peewee.CharField(255)
    id_value = peewee.CharField(255)
    area = peewee.CharField(255)
    age = peewee.IntegerField()

    class Meta:
        database = database
        db_table = "developers"

    def developer_exists(self, id_type, id_value):
        return DevelopersORM.select().where(
            DevelopersORM.id_type == id_type,
            DevelopersORM.id_value == id_value
        ).exists()

    def create_developer(self, args):
        return DevelopersORM.insert(
            name=args["name"],
            lastname=args["lastname"],
            id_type=args["id_type"],
            id_value=args["id_value"],
            area=args["area"],
            age=args["age"]
        ).execute()

    def get_all_developers(self):
        query = DevelopersORM.select()
        results = []
        for dev in query:
            results.append(model_to_dict(dev))
        return results

    def get_developer_by_id_params(self, id_type, id_value):
        results = DevelopersORM.select().where(
            DevelopersORM.id_type == id_type,
            DevelopersORM.id_value == id_value
        ).get()
        return model_to_dict(results)

    def update_developer(self, args):
        dev = DevelopersORM.select().where(
            DevelopersORM.id_type == args["id_type"],
            DevelopersORM.id_value == args["id_value"]
        ).get()
        dev.name = args["name"]
        dev.lastname = args["lastname"]
        dev.id_type = args["id_type"]
        dev.id_value = args["id_value"]
        dev.area = args["area"]
        dev.age = args["age"]
        return dev.save()

    def delete_developer_by_id_params(self, id_type, id_value):
        query = DevelopersORM.delete().where(
            DevelopersORM.id_type == id_type,
            DevelopersORM.id_value == id_value
        )
        return query.execute()


if __name__ == "__main__":
    if database.table_exists("developers"):
        print("Table already exists")
    else:
        print("Table does NOT exists")
        # DevelopersORM.create_table()

    devs = DevelopersORM()

    args = {}
    args["name"] = "Santiago"
    args["lastname"] = "Garcia"
    args["id_type"] = "cc"
    args["id_value"] = "1234"
    args["area"] = "SuperDevOps"
    args["age"] = 50

    print("create(cc, 1234): ", devs.create_developer(args))

    print("exists(cc, 1234): ", devs.developer_exists("cc", "1234"))

    print("get(cc, 1234): ", devs.get_developer_by_id_params("cc", "1234"))

    args = {}
    args["name"] = "Santi"
    args["lastname"] = "Garci"
    args["id_type"] = "cc"
    args["id_value"] = "1234"
    args["area"] = "DevOps"
    args["age"] = 21
    print("update(cc, 1234, args): ", devs.update_developer(args))

    print("get(cc, 1234): ", devs.get_developer_by_id_params("cc", "1234"))

    print("delete(cc, 1234): ", devs.delete_developer_by_id_params("cc", "1234"))

    print("exists(cc, 1234): ", devs.developer_exists("cc", "1234"))

    print("create(cc, 1234): ", devs.create_developer(args))
