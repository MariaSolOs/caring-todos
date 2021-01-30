require('dotenv').config({ path: './.env' });

// Server setup
const { ApolloServer } = require('apollo-server-express'),
       typeDefs = require('./schema'),
       resolvers = require('./resolvers'),
       mongoClient = require('./config/mongoDB'),
      { Users, Todos } = require('./datasources'),
       express = require('express'),
       path = require('path'),
       cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        userAPI: new Users(mongoClient.db().collection('users')),
        todosAPI: new Todos(mongoClient.db().collection('todos')),
    })
});
server.applyMiddleware({ app, path: '/server' });

// app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready at ${server.graphqlPath}`);
});

  
