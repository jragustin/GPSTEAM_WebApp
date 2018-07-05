import { refreshTokens, tryLogin } from '../helpers/auth'
import { SECRET } from '../index'
import { User, Site } from '../sql/connector'
import bcrypt from 'bcrypt'

//
export const resolvers = {
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
        users(){ 
            return User.findAll()
        },
        sites(){
            return Site.findAll()
        }
    },
    Mutation: {
        register: async (_, args) => {
            const user = args;
            user.password = await bcrypt.hash(user.password, 12);
      
            console.log('Register user: ', user)
            return User.create(user)
        },

        login: async (parent, { username, password }, { SECRET }) => tryLogin(username, password, SECRET),

        refreshTokens: (parent, { token, refreshToken }, { SECRET }) => refreshTokens(token, refreshToken, SECRET),
    }
}