// https://www.apollographql.com/docs/graphql-tools/generate-schema.html#modularizing

import { refreshTokens, tryLogin } from '../helpers/auth'
import { SECRET } from '../index'
import { AccessLevel, AntennaModel, Antenna , CampaignLogsheet, ContactNumber, ContinuousLogsheet, 
Division, Email, EquipmentBrand, Marker, NonStaffPosition, OfficeLocation, Person,  
PersonType, Position, ReceiverModel, Receiver, Site, SurveyType, User,} from '../sql/connector' // Imports the required connector for the mutation to work

import bcrypt from 'bcrypt' //for hashing values

/*
In order to respond to queries, a schema needs to have resolve functions for all fields. 
This collection of functions is called the “resolver map”. 
This map relates the schema fields and types to a function. The resolverMap object (IResolvers) should have a map of 
resolvers for each relevant GraphQL Object Type.
*/


import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub


export const resolvers = {
    //queries are responsible for getting data from database
    // Query is the method wrapper
    
    Query: {
        
        developer: () => "Oriel Vinci Absin",
        me: (_, args, { user }) => {
            if(user) {
                return User.findOne({
                    where: {
                        id: user.id
                    }
                });
            } 
            // not logged in
            return 'Not logged in'

        },

        allUsers(){
            return User.findAll();
        },

        allSites(){
            return Site.findAll();
        },

        allContinuousLogsheets(){
            return ContinuousLogsheet.findAll();
        },
        
        allCampaignLogsheets(){
            return CampaignLogsheet.findAll();
        },

        allPersons(){
            return Person.findAll();
        },

        campaignSites(_, args){
            return Site.findAll({
                where: {
                    survey_type_id: 2
                }
            });
        },

        continuousSites(_, args, { site }){
            return Site.findAll({
                where: {
                    survey_type_id: 1
                }
            });

        },

        lastCampaignLogsheet(){
            return CampaignLogsheet.findOne({
                order:[
                    ['id','desc']
                ]
            })
        }


    },
    //mutation is responsible for updating the state of the server
    Mutation: {
        //this is the place were all the mutations are done.
        register: async (_, args) => {
            const user = args;
            user.password = await bcrypt.hash(user.password, 12);
            console.log('Register user: ', user)
            return User.create(user)
        },

        login: async (parent, { username, password }, { SECRET }) => tryLogin(username, password, SECRET),

        refreshTokens: (parent, { token, refreshToken }, { SECRET }) => refreshTokens(token, refreshToken, SECRET),

        createContinuousLogsheet: (_,args) =>{ 
            const continuousLog = args;
            console.log("Submitted", continuousLog) 
            return ContinuousLogsheet.create(continuousLog)
        },
        createCampaignLogsheet: (_,args) =>{ 
            const campaignLog = args;
            console.log("Submitted", campaignLog) 
            return CampaignLogsheet.create(campaignLog)
        },
         createCampaignObservers: (_,args) =>{ 
            const campaignObservers = args;
            console.log("Submitted", campaignObservers) 
            return campaignObservers
        },
    }
}