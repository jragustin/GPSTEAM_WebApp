import express from 'express'
import { getSchema } from './graphql-sequelize-crud-aylabyuk/src'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { db as sequelize} from './sql/connector'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { customSchema } from './customSchema/index'
import { mergeSchemas } from 'graphql-tools'
import { refreshTokens } from './helpers/auth'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { express as middleware } from 'graphql-voyager/middleware'

import { requiresAuth, requiresStaff, requiresAdmin } from './helpers/permission'

const expressPlayground = require('graphql-playground-middleware-express').default

const server = express();

const PORT = 4000;

server.use('*', cors());

// server secret
export const SECRET = 'jskdaskdujhaskjdhn3487230409849abfikwkasbjkj';



// implement tokens and refresh-tokens checks 
const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
            console.log('SUCCESS JWT: ', user)
        } catch (err) {
            console.log('ERROR JWT', err)
            const refreshToken = req.headers['x-refresh-token'];
            const newTokens = await refreshTokens(
                token,
                refreshToken,
                SECRET,
            );
            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }   
            req.user = newTokens.user;
        }
    } else {
        req.user = {}
    }
    next();
};
  
server.use(addUser);

sequelize.sync({
    // force: true
}).then(() => {

    const schema = getSchema(sequelize)

    let merged = mergeSchemas({
        schemas: [schema, customSchema]
    })

    server.use('/graphql', bodyParser.json(), graphqlExpress((req) => ({
        schema: merged,
        context: {
            SECRET,
            user: req.user
        }
    })));

    server.use(express.static('uploads'))

    server.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://192.168.1.200:${PORT}/graphql`
    }));

    server.get('/playground', expressPlayground({ 
        endpoint: '/graphql',
        subscriptionEndpoint: `ws://192.168.1.200:${PORT}/graphql`
    }));

    server.use('/voyager', middleware({ endpointUrl: '/graphql' }))

    const ws = createServer(server);
    ws.listen(PORT, () => {
        console.log(`Apollo Server is now running on http://192.168.1.200:${PORT}`);
        // Set up the WebSocket for handling GraphQL subscsriptions
        new SubscriptionServer({
            execute,
            subscribe,
            schema: merged
        }, {
            server: ws,
            path: '/graphql',
        });
    });

})