/*
it looks like a javascript but it's not. it's graphql


this is the graphql schema. 
Schema Definition Language(SDL)
GraphQL Schema Defines the server's API

/*
the typedefs has three very important types:
Query - fetch or get or request data from server
Mutation - Makes all the (Creating, Updating, and Deleting) CUD in the database
Subscription - Listens to an event so that a user may know any event or CUD done by the server

The structuring here is modularized. The resolver is separated from these definitions.
To know more about modularizing read:

https://www.apollographql.com/docs/graphql-tools/generate-schema.html#modularizing
https://www.apollographql.com/docs/graphql-tools/generate-schema.html#Example

*/

export const typeDefs = `
    type User{
        id: ID!
        username: String!
        password: String!
        access_level_id: Int
        person_id: Int
    }

    type Site{
        id: ID!
        name: String!
        dateEstablished: String
        latitude: Float
        longitude: Float
        location: String
        description: String
        createdAt: String!
        updatedAt: String!
        survey_type_id: Int
        marker_id: Int
    }

    type CampaignLogsheet{
        id: ID!
        date: String!
        heightNorthMeters: Float!
        heightEastMeters: Float!
        heightSouthMeters: Float!
        heightWestMeters: Float!
        timeStart: String
        timeEnd: String
        failureTime: String
        azimuth: Float
        notes: String
        site_id: Int
        antenna_id: Int
        receiver_id: Int
    }

    type ContinuousLogsheet{
        id: ID!
        isPowerOn: Int!
        date: String!
        batteryCondition: String
        chargerCondition: String
        otherNotes: String
        createdAt: String!
        site_id: Int
        antenna_id: Int
        receiver_id: Int
    }

    type Person{
        id: ID!
        firstName: String!
        lastName: String!
        nickName: String!
        birthdate: String
        position_id: Int
        division_id: Int
        site_id: Int
        person_type_id: Int
        non_staff_position_id: Int
        office_location_id: Int
    }

    type CampaignObserver{
        id: ID!
        campaign_logsheet_id: Int!
        person_id: Int!
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
        allUsers: [User]
        allSites: [Site]
        allContinuousLogsheets: [ContinuousLogsheet]
        allCampaignLogsheets: [CampaignLogsheet]
        allPersons: [Person]
        campaignSites: [Site]
        continuousSites: [Site]
        lastCampaignLogsheet: CampaignLogsheet
    }

    type Mutation {
        # a register mutation of type regUser as desc above
        # regUser is the payload new
        register( username: String!, password: String ) : regUser!

        login( username: String!, password: String ) : AuthPayload!
        
        refreshTokens(token: String!, refreshToken: String! ) : AuthPayload!
        # this should reflect the declaration in the schema as seen here: ../../schema.graphql
        createContinuousLogsheet( isPowerOn:Int!, date:String, batteryCondition:String, chargerCondition:String, otherNotes:String, createdAt:String!, site_id:Int, antenna_id:Int, receiver_id: Int ) : ContinuousLogsheet
        createCampaignLogsheet(  date: String!, heightNorthMeters: Float!, heightEastMeters: Float!, heightSouthMeters: Float!, heightWestMeters: Float!, timeStart: String, timeEnd: String, failureTime: String, azimuth: Float, notes: String, site_id: Int, antenna_id: Int, receiver_id: Int ) : CampaignLogsheet
        createCampaignObservers( campaign_logsheet_id: Int!, person_id: Int! ) : CampaignObserver
    }
`