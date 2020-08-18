# NodeJS Global Mentoring Program 2020Q3 - Homeworks

## Prerequisites

We need to to install NodeJS or `nvm` if you prefer:

- [Node.js](https://nodejs.org/en/)

---

## Homeworks source code index

| Homework |    Folder     |                       Git Branch                                |
|:--------:|:--------------|-----------------------------------------------------------------|
|    01    |  **src/hw01** | homework/01-basics-nodejs-fundamental-theory                    |
|    02    |  **src/hw02** | homework/02-in-memory-crud-rest-service-with-validation, master |

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

#### **Homework 02**

- I implemented `TypeScript`.
- I implemented `eslint-airbnb` and `eslint-airbnb-typescript` to avoid problems with `TypeScript` and `eslint`.
- I decided to use `class-validator` instead of `joi`/`joi-validation` because in my experience the annotations are a more elegant solution for `TypeScript`.

With `npm`:
```console
npm run start
```

With `yarn`:

```console
yarn start
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