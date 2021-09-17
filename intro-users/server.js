const express = require("express");
// const expressGraphQL = require('express-graphql');
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();

// IF a graphql request comes in, we want to forward that to graphql handler
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
