const { gql } = require('apollo-server-express');

 module.exports = gql`
    type Query {
        todos(userId: ID!): [Todo]
    }

    type Todo {
        _id: ID!
        title: String!
        description: String
        category: String
        completed: Boolean!
    }

    type User {
        _id: ID!
        email: String!
        todos: [Todo!]
    }
 `;