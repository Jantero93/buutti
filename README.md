# Buutti Full stack task

This is simple application consisting of a client, API, and Database for managing book catalog.

## Assumptions
* An author can have multiple books, but a book can have only one author. At the time writing this I realized that relationship should probably be truly Many-To-Many.
* Author's name and book's title are unique.

## Main technologies used

**Client**

* React, TypeScript, Vite
* MUI
* react-query

The client is mobile responsive. Because I applied for backend position, I didn't do anything extra fancy on client.

**API**

* .NET Core 8
* Entity Framework Core 6, code first approach

**Database**
* PostgreSQL
* PgAdmin

**Pipeline**
* Github actions, runs simple build from client and API on commit. Caches dependencies.

The entire application is containerized using Docker. The client runs in nginx when used with Docker.

## Starting the application



On root directory run command
`docker-compose --file docker-compose.yml --env-file .env.local up --build`

**Client is hosted on localhost port 80 when using Docker**

It builds the application with production mode. All needed configuration is included in .env.local file.
Migrations etc. are run automatically on start of the application.






