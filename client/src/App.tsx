import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Todo } from './models';

import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
    // Logged in user
    const [email, setEmail] = useState('');

    // Todo list management
    const [todos, setTodos] = useState<Todo[]>([]);
    const handleAddTodo = (newTodo: Todo) => {
        setTodos((todos) => [...todos, newTodo]);
    } 

    return (
        <Switch>
            <Route path="/dashboard">
                <Dashboard 
                email={email}
                allTodos={todos}
                onAddTodo={handleAddTodo}/>
            </Route>
            <Route path="/">
                <Login 
                setEmail={(email: string) => setEmail(email)}
                setTodos={(todos) => setTodos(todos)}/>
            </Route>
        </Switch>
    );
}

export default App;
