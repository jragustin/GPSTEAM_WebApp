import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

export const customSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})