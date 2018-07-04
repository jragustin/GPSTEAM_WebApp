//it looks like a javascript but it's not. it's graphql


// this is the graphql schema. 
export const typeDefs = `

    type User {
        id: ID
        username: String

    }
    type Site {
        id: ID
        name: String
    }
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
        users: [User]
        sites: [Site]
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