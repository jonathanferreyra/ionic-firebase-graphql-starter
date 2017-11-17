import bodyParser from "body-parser"
import express from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import { printSchema } from "graphql/utilities/schemaPrinter"
import schema from "./schema"
import models from '../models';


const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express()

  // syncronize models
  // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#database-synchronization
  models.sequelize.sync();

  graphQLServer.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
  }})

  // /api/graphql
  graphQLServer.use(
    "/graphql"
,    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  )

  // /api/graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress({ endpointURL: "graphql" })
  )

  // /api/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer
