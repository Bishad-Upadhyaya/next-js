### Working with Prisma

- First install using: `npm i prisma@<version_name>` eg: `npm i prisma@5.3.1`

- Then, initialize the project: `npx prisma init`

- It will create a file `prisma/schema.prisma` that will contain the necessary database configurations

- Then, it adds a `.env` file with `DATABASE_URL` in it (we have to change it if using other databases)

- Then, we can create/define models inside `prisma/schema.prisma`

- For formatting the code inside `prisma/schema.prisma`, we can use: `npx prisma format`

- After, we need to migrate the updated models using: `npx prisma migrate dev`