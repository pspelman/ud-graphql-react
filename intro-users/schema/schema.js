const graphql = require("graphql");
const axios = require("axios");
const { GraphQLID } = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLSchema, GraphQLObjectType } = graphql;
// const _ = require("lodash");

const users = [
  { id: 1, firstName: "Bill", age: 20 },
  { id: 2, firstName: "Samantha", age: 20 },
];

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // args.companyId
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((resp) => resp.data);
      },
    },
  },
});

// add the root query to tell GQL where to jump into the data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        // return _.find(users, { id: args.id });
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
