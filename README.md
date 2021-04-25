## postgre SQL

# Prepare

1. create `ormconfig.json` file in root your project and add

```
{
  "type": "postgres",
  "host": "tai.db.elephantsql.com",
  "port": 5432,
  "username": "kekbxmoo",
  "password": "**************",
  "database": "kekbxmoo",
  "synchronize": false,
  "entities": [
    "src/modules/users/user.model.ts",
    "src/modules/groups/group.model.ts"
  ],
  "migrations": [
    "src/migration/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/migration"
  }
}
```

2. add your environments

# CLI tool 1 option
1. **-q, --quantity**

**Usage example:**

```
npm run seed -- -q 45

```
or

```
npm run seed

```
