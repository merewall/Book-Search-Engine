// BRING IN EXPRESS MODULE
const express = require('express');
// BRING IN APOLLO SERVER
const { ApolloServer } = require('apollo-server-express');

// BRING IN PATH MODULE
const path = require('path');

// BRING IN TYPEDEFS AND RESOLVERS
const { typeDefs, resolvers } = require('./schemas');

// DATABASE CONNECTION
const db = require('./config/connection');

// DO WE NEED THIS!?!?
// const routes = require('./routes');

// SET PORT AND INSTANCE OF EXPRESS SERVER
const PORT = process.env.PORT || 3001;
const app = express();

// CREATE NEW INSTANCE OF APOLLO SERVER PASSING IN TYPEDEFS AND RESOLVERS
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// CONNECT APOLLO SERVER TO EXPRESS
server.applyMiddleware({ app });

// DATA PARSING & ABILITY TO USE JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// DO WE NEED THIS!?!?
// app.use(routes);

// WILDCARD ROUTE TO DIRECT TO HOMEPAGE
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// START APP LISTENING
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
