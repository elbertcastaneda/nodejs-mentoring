# NodeJS Mentoring Program

## Prerequisites

We need to install NodeJS or `nvm` if you prefer:

- [Node.js](https://nodejs.org/en/)

---

## Homeworks source code index

| Module   |       Folder      |                       Git Branch                                  |
|:--------:|:------------------|-------------------------------------------------------------------|
|    01    |  **src/module01** | module/01-basics-nodejs-fundamental-theory                        |
|    02    |  **src/module02** | module/02-in-memory-crud-rest-service-with-validation             |
|  03, 04  |  **src/module03** | module/03-postgres-sequelize                                      |
|    05    |  **src/module03** | module/05-logging-error-handling                                  |
|    06    |  **src/module03** | module/06-jwt-authorization-and-cors, main                        |

---
---

## Getting Started

Follow these instructions to be able to clone this project and run it locally.

### Clone the repository

```bash
git clone https://github.com/elbertcastaneda/nodejs-mentoring
```

---

### Go to the project folder

```bash
cd nodejs-mentoring
```

---

### Install dependencies:

With `npm`:

```bash
npm install
```

---
---

### Run tasks:

#### Module 03, 04, 05 and 06

- Implement `TypeScript`.
- Implement `eslint-airbnb` and `eslint-airbnb-typescript` to implement a code styling standard in a fast way
- Implement `TypeORM`

- If you have docker installed, you can install `postgres` with: `docker-compose up -d --build`, and you can remove the docker containers with: `docker-compose down`
- If you installed `postgres` you can create the database with `npm run db:create:schema && npm run db:migration:run`, and you can remove `npm run db:drop:schema`

With `npm`:

```bash
npm run start
```

Simple Documentation on:

- https://documenter.getpostman.com/view/11523570/TVYQ3aeF

---

#### Module 02

- Implement `TypeScript`.
- Implement `eslint-airbnb` and `eslint-airbnb-typescript` to implement a code styling standard in a fast way

With `npm`:

```bash
npm run mdl02:start
```

---

#### Module 01

With `npm`:
```bash
npm run mdl01:task1
npm run mdl01:task2
npm run mdl01:task1:babel
npm run mdl01:task2:babel
```
