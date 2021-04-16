## postgre SQL

create `.env` file in root your project and add

```
PORT=3000

TYPEORM_TYPE=postgres
TYPEORM_HOST=tai.db.elephantsql.com
TYPEORM_PORT=data
TYPEORM_USERNAME=data
TYPEORM_PASSWORD=data
TYPEORM_DATABASE=data
TYPEORM_URL=data
TYPEORM_ENTITIES=src/users/user.model.ts
TYPEORM_SYNCHRONIZE=false
TYPEORM_MIGRATIONS=src/users/migration/*.js
```

instead `data` insert your dependency

# CLI tool 1 option
1. **-q, --quantity**

**Usage example:**
```
npm run seed -- -q 45

```
