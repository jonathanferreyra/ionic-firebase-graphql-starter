# Ionic3 App + GraphQL Server on Cloud Functions for Firebase

This repo shows how to implement an architecture using [Express](http://expressjs.com/) + [GraphQL](http://graphql.org) + [Sequelize](http://docs.sequelizejs.com/) in the backed, and an Ionic application in the frontend.

The logic is a simple CRUD of contacts with fields: name, address and phone.

The data layer is managed by Sequelize using [SQLite](https://www.sqlite.org/) as persistence.

GraphQL is handled with the [Apollo](https://www.apollographql.com) libraries.

## TLDR;

Host your GraphQL Server on Cloud Functions enabling rapid development with GraphQL on a low-cost, auto-scaling web server leveraging Firebase's sweet, sweet developer experience.

Cloud Functions can accept an [Express Server object directly](http://stackoverflow.com/questions/43579442/cloud-functions-for-firebase-and-express), so leverage the Apollo [apollo-server-express](https://github.com/apollographql/apollo-server) pacakge to setup our GraphQL server.

### Routes

Schema: `https://us-central1-<project-name>.cloudfunctions.net/api/schema`

GraphiQL: `https://us-central1-<project-name>.cloudfunctions.net/api/graphiql`

GraphQL: `https://us-central1-<project-name>.cloudfunctions.net/api/graphql?<query>`

## Installation

```
git clone https://github.com/jonathanferreyra/ionic-graphql-firebase-starter
cd ionic-graphql-firebase-starter

// install firebase functions packages
cd functions/ && yarn install

// install ionic packages
cd app/ && yarn install
```

## Environment

* Node 6.11.1

## Setup empty database

```
node_modules/.bin/sequelize model:create --name Contact --attributes name:string,address:string,phone:string

node_modules/.bin/sequelize db:migrate

node_modules/.bin/sequelize db:seed:all
```

## Local Development

```
yarn serve
```
This will serve the Cloud Functions locally using the [Firebase emulator](https://firebase.google.com/docs/functions/local-emulator).

After running the first time, you can rerun using `yarn test` or what is the same `cd dist/functions && node server.js`

## Ionic app

From the app you can try operations: create, edit, update, list & search

<img src="https://raw.github.com/informaticameg/ionic-firebase-graphql-starter/master/app/screen1.png" />
<img src="https://raw.github.com/informaticameg/ionic-firebase-graphql-starter/master/app/screen2.png" />
<img src="https://raw.github.com/informaticameg/ionic-firebase-graphql-starter/master/app/screen3.png" />

## Deploy to Firebase

```
yarn deploy
```
*N.B.*: Replace `<project-name>` in the `.firebaserc` to connect the project to your Firebase project.

