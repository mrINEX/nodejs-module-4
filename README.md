## postgre SQL

create `.env` file in root your project and add

```
PORT=3000

TYPEORM_TYPE=postgres
TYPEORM_HOST=tai.db.elephantsql.com
TYPEORM_PORT=5432
TYPEORM_USERNAME=kekbxmoo
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=kekbxmoo
TYPEORM_URL=postgres://kekbxmoo:passwordnz9sN@tai.db.elephantsql.com:5432/kekbxmoo
TYPEORM_ENTITIES=src/users/user.model.ts
TYPEORM_SYNCHRONIZE=false
TYPEORM_MIGRATIONS=src/users/migration/*.ts
```

add your environments

# CLI tool 1 option
1. **-q, --quantity**

**Usage example:**
```
npm run seed -- -q 45

```
