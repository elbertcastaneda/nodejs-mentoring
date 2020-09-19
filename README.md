# NodeJS Global Mentoring Program 2020Q3 - Homeworks

## Prerequisites

We need to to install NodeJS or `nvm` if you prefer:

- [Node.js](https://nodejs.org/en/)

---

## Homeworks source code index

| Homework |    Folder     |                       Git Branch                                |
|:--------:|:--------------|-----------------------------------------------------------------|
|    01    |  **src/hw01** | homework/01-basics-nodejs-fundamental-theory                    |
|    02    |  **src/hw02** | homework/02-in-memory-crud-rest-service-with-validation         |
|  03, 04  |  **src/hw03** | homework/03-postgres-sequelize, master                          |

---
---

## Getting Started

Follow next instructions to be able to clone this project and run it locally.

### Clone the repository

```console
git clone https://github.com/elbertcastaneda/nodejs-epam-hw-tasks
```

---

### Go to project folder

```console
cd nodejs-epam-hw-tasks
```

---

### Install dependencies:

With `npm`:
```console
npm install
```

With `yarn`:
```console
yarn install
```

---
---

### Run tasks:

#### **Homework 03 and 04**

- I implemented `TypeScript`.
- I implemented `eslint-airbnb` and `eslint-airbnb-typescript` to avoid problems with `TypeScript` and `eslint`.
- I implemented `TypeORM` instead of `Sequelize` in my opinion works better with TypeScript
- I decided to used another structure for the files, I am using a very similar structure then NestJS.

- If you have docker installed, you can install `postgres` with: `docker-compose up -d --build`, you can remove the docker containers with: `docker-compose down`
- If you installed `postgres` you can create the database with `yarn run db:create:schema && yarn run db:migration:run`, and you can remove `yarn run db:drop:schema`

With `npm`:
```console
npm run start
```

With `yarn`:

```console
yarn start
```

---

#### **Homework 02**

- I implemented `TypeScript`.
- I implemented `eslint-airbnb` and `eslint-airbnb-typescript` to avoid problems with `TypeScript` and `eslint`.
- I decided to use `class-validator` instead of `joi`/`joi-validation` because in my experience the annotations are a more elegant solution for `TypeScript`.

With `npm`:
```console
npm run hw02:start
```

With `yarn`:

```console
yarn hw02:start
```

---

#### **Homework 01**

With `npm`:
```console
npm run hw01:task1
npm run hw01:task2
npm run hw01:task1:babel
npm run hw01:task2:babel
```

With `yarn`:
```console
yarn hw01:task1
yarn hw01:task2
yarn hw01:task1:babel
yarn hw01:task2:babel
```