import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

// makeExecutableSchema is needed for the resolver and the schema to be passed to the apollo server
export const customSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})