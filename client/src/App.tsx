import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Todo } from './models';

import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
    // Todos from logged in user
    const [todos, setTodos] = useState<Todo[]>([]);

    return (
        <Switch>
            <Route path="/dashboard">
                <Dashboard/>
            </Route>
            <Route path="/">
                <Login setTodos={(todos) => setTodos(todos)}/>
            </Route>
        </Switch>
    );
}

export default App;
