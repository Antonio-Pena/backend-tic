## Installation

To install the project, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/Antonio-Pena/backend-tic.git
```

2. Install dependencies:

```bash
cd backend-tic
yarn
```

3. Set the environment variables in the .env file in the path backend-tic/.env:

```javascript
DATABASE_URL =
  "postgres://antonio:kNyOy858dl5HVFoP81g0WdjFW1sebcpv@dpg-cjfsi0r37aks73fam5v0-a.oregon-postgres.render.com/ticdatabase?connect_timeout=300";
```

Update database connection string if necessary. For this work we have used a postgresql database in Render from render.com.

5. You need to install nodemon before running the backend

```bash
npm install -g nodemon
```

You can also install nodemon as a development dependency:

```bash
cd backend-tic
yarn add -D nodemon
```

6.  Start the backend:

```bash
cd backend-tic
yarn start:dev
```

7. Access the Apollo server in your web browser at the following URL:

```
http://localhost:4000/
```

8. To generate the data model with prism the following command is set up

```bash
yarn db:generate
```

9. To update the database with prisma the following command is set up

```bash
yarn db:push
```

10. To manage the database with prisma the following command is set up

```bash
yarn db:studio
```
