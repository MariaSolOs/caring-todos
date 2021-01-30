const { MongoDataSource } = require('apollo-datasource-mongodb');

exports.Users = class extends MongoDataSource {
    async findOrCreateUser(email) {
        let user = await this.collection.findOne({ email });
        if(!user) {
            user = await this.collection.insertOne({
                email,
                todos: []
            });
        }

        return user;
    }
}

exports.Todos = class extends MongoDataSource {
    getTodosFromUser(ids) {
        return this.findManyByIds(ids);
    }

    createTodo(title, description, category) {
        return this.collection.insertOne({
            title, 
            description, 
            category,
            completed: false
        });
    }

    setTodoCompleted(id) {
        return this.collection.updateOne(
            { _id: ObjectID(id) },
            { $set: { completed: true } }
        );
    }
}