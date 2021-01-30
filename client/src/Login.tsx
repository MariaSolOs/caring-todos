import React, { useState } from 'react';

import './styles/Titles.css';
import './styles/Boxes.css';
import './styles/Buttons.css';
import './styles/Tabs.css';

type Props = {
    onLogin: (email: string) => void;
}

const Login = (props: Props) => {
    const [email, setEmail] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Maria logs user in
        props.onLogin(email);
    }

    return (
        <div className="App">
            <form className="MainBox" onSubmit={handleLogin}>
                <h1 className="MainTitle">Dashboard</h1>
                <div className="Box">
                    <label className="SubTitle">Email</label>
                    <input className="TextBox"
                        id="email"
                        type="text" 
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    <button className="Button" type="submit">Log in</button>
                </div>
            </form>
        </div>
  );
}

export default Login;
