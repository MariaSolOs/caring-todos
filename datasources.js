const { MongoDataSource } = require('apollo-datasource-mongodb');
const { ObjectID } = require('mongodb');

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

    addTodo(userEmail, todoId) {
        return this.collection.updateOne(
            { email: userEmail },
            { $push: { todos: todoId } }
        );
    }
}

exports.Todos = class extends MongoDataSource {
    getTodosFromUser(ids) {
        return this.findManyByIds(ids);
    }

    async createTodo(title, description, category) {
        const { insertedId } = await this.collection.insertOne({
            title, 
            description, 
            category,
            completed: false
        });
        return this.findOneById(ObjectID(insertedId));
    }

    async toggleTodo(id, completed) {
        await this.collection.updateOne(
            { _id: ObjectID(id) },
            { $set: { completed } }
        );
        return this.findOneById(ObjectID(id));
    }
}

exports.Recipes = class extends MongoDataSource {
    async getRecipe() {
        const recipes = await this.collection.find({}).toArray();
        return recipes[Math.floor(Math.random() * 3)];
    }
}