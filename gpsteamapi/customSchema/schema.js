export const typeDefs = `
    type AuthPayload {
        token: String!
        refreshToken: String!
    }

    type regUser {
        id: ID
        username: String
        access_level_id: Int
    }

    type Query {
        developer: String!
        me: regUser
    }

    type Mutation {

        register(
            username: String!
            password: String
        ) : regUser!

        login( username: String!, password: String) : AuthPayload!
        
        refreshTokens(token: String!, refreshToken: String!) : AuthPayload!
    }
`