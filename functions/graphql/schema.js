import { makeExecutableSchema } from "graphql-tools"
import { merge } from "lodash"

import { schema as ContactSchema } from './schema/contact/contact.type'

import { rootResolvers } from './resolvers'
import { resolvers as ContactResolver} from './schema/contact/contact.resolvers'


const rootSchema = `
type Query {
  contacts(
    name:String,
    address:String,
    phone:String
  ): [Contact]
  contact(id: Int!): Contact
}

type Mutation {
  addContact(name:String!, address:String, phone:String): Contact
  updateContact(id:ID!, name:String!, address:String, phone:String): Contact
  removeContact(id:ID!): Contact
}

schema {
  query: Query
  mutation: Mutation
}
`;

const schemas = [rootSchema, ContactSchema];
const resolvers = merge(rootResolvers, ContactResolver)

export default makeExecutableSchema({
  typeDefs: schemas,
  resolvers,
});