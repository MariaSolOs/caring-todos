module.exports = {
    User: {
        todos: (user, _, { dataSources }) => {
            return dataSources.todosAPI.getTodosFromUser(user.todos);
        }
    },

    Mutation: {
        login: (_, { email }, { dataSources }) => {
            return dataSources.userAPI.findOrCreateUser(email);
        },

        createTodo: (_, { title, description, category }, { dataSources }) => {
            return dataSources.todosAPI.createTodo(title, description, category);
        },

        setTodoCompleted: (_, { todoID }, { dataSources }) => {
            return dataSources.todosAPI.setTodoCompleted(todoID);
        }
    }
}