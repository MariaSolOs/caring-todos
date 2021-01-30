const { gql } = require('apollo-server-express');

 module.exports = gql`
    type Query {
        todos(email: String!): [Todo]
    }

    type Mutation {
        login(email: String!): User!
        createTodo(userEmail: String!, title: String!, description: String, category: String): Todo!
        toggleTodo(todoId: ID!, completed: Boolean!): Todo!
    }

    type Todo {
        _id: ID!
        title: String!
        description: String
        category: String
        completed: Boolean!
    }

    type User {
        email: String!
        todos: [Todo!]
    }
 `;