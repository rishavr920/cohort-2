1. clone the project from https://github.com/100xdevs-cohort-2/paytm-project-starter-monorepo this is the starting point of the project it contains all initial configuration to start the paytm project.

2. then do npm install it install all dependency that are required to run the project.
3. now time to configure the database we have two option either we bring database connection string from neon.tech or aiven or we can use postgres localhost, i choose postgresql by docker to do that we use

docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres it return a string as 
0dfe26128012d6b0f447ebdc5c0f5fd047873b5ecbd01e3022808fe2e1080ea2

4. now go to cd packages/db from here we do npx prisma migrate dev it convert all schema.prisma into migration folder in sql files. this is the output

(base) rishavraj@Rishavs-Mac db % npx prisma migrate dev
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public" at "localhost:5432"

Applying migration `20240323121305_init`
Applying migration `20240324100733_add_merchant`
Applying migration `20240324104524_add_merchant`
Applying migration `20240324105137_add_password`

The following migration(s) have been applied:

migrations/
  └─ 20240323121305_init/
    └─ migration.sql
  └─ 20240324100733_add_merchant/
    └─ migration.sql
  └─ 20240324104524_add_merchant/
    └─ migration.sql
  └─ 20240324105137_add_password/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (v5.11.0) to ./../../node_modules/@prisma/client in 35ms

5. after that we do npx prisma generate it created prisma client in node.js

(base) rishavraj@Rishavs-Mac db % npx prisma generate
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v5.11.0) to ./../../node_modules/@prisma/client in 33ms

Start using Prisma Client in Node.js (See: https://pris.ly/d/client)
```
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```
or start using Prisma Client at the edge (See: https://pris.ly/d/accelerate)
```
import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()
```
6. now let's see everything working fine i choose to go inside postgres db for that first i need container id of postgres db for that use command docker ps it give container id

7. by help of container id i write this command->  docker exec -it 0dfe26128012 bash (it give  output like this)

(base) rishavraj@Rishavs-Mac db % docker exec -it 0dfe26128012 bash
root@0dfe26128012:/# psql -U postgres
psql (17.2 (Debian 17.2-1.pgdg120+1))
Type "help" for help.

postgres=# \dt
               List of relations
 Schema |        Name        | Type  |  Owner   
--------+--------------------+-------+----------
 public | Merchant           | table | postgres
 public | User               | table | postgres
 public | _prisma_migrations | table | postgres
(3 rows)

postgres=# 

8. next we add .env file in app/user-app like this 
  JWT_SECRET=test
  NEXTAUTH_URL=http://localhost:3001

9. next we do npm run dev in user-app go to localhost:3001 and try to log in using my no - 9631862729 and password - rishav@123 and then on pressing signin new page open with log out in appbar it means successfully logged in does this login information go to postgres to see this.

10. (base) rishavraj@Rishavs-Mac paytm-project-starter-monorepo % docker exec -it 0dfe26128012 /bin/bash
root@0dfe26128012:/# psql -U postgres

postgres=# select * from "User";
 id | email | name |   number   |                           password                           
----+-------+------+------------+--------------------------------------------------------------
  1 |       |      | 9631862729 | $2b$10$T3ckeg58IxXgrCY2qMMMV.YIznPW67QryQA79c92m1QBOZ4dfOc/e
(1 row)

postgres=# 

and here we can see the information of user in User table there is other way that is too simple to do this 
simply go to cd packages/db after that npx prisma studio.

11. from here we started building bank_webhook_handler in which first we create folder and then initialize backend like npm init -y and then npx tsc --init after than install dependencies npm i esbuild express @types/express then updating the schema in db adding balance and OnRampStatus table in db.