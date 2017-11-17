import { https } from "firebase-functions"
import setupGraphQLServer from "./graphql/server"
import { serveHttp } from 'webfunc';

const PORT = 3000;

const graphQLServer = setupGraphQLServer()
graphQLServer.listen(PORT, function() {
    console.log('Server listen on port', PORT);
})
