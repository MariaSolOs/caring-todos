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

        createTodo: async (_, { userEmail, title, description, category }, { dataSources }) => {
            const todo = await dataSources.todosAPI.createTodo(title, description, category);
            await dataSources.userAPI.addTodo(userEmail, todo._id);
            return todo;
        },

        toggleTodo: (_, { todoId, completed }, { dataSources }) => {
            return dataSources.todosAPI.toggleTodo(todoId, completed);
        }
    }
}