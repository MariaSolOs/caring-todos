import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
    // Logged in user info
    const [email, setEmail] = useState('');

    const handleLogin = (email: string) => {
        setEmail(email);
        // Maria logs user here
    }

    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/">
                <Login onLogin={handleLogin}/>
            </Route>
        </Switch>
    );
}

export default App;
