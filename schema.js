const { gql } = require('apollo-server-express');

 module.exports = gql`
    type Query {
        todos(email: String!): [Todo]
    }

    type Mutation {
        loginUser(email: String!): User!
        createTodo(title: String!, description: String, category: String): Todo!
        setTodoCompleted(todoID: ID!): Todo!
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