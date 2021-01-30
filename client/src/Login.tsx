import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import './styles/Titles.css';
import './styles/Boxes.css';
import './styles/Buttons.css';
import './styles/Tabs.css';

const LOGIN_USER = gql`
    mutation LoginUser($email: String!) {
        login(email: $email) {
            todos
        }
    }
`;

type Props = {
    onLogin: (email: string) => void;
}

const Login = (props: Props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Maria logs user in
        props.onLogin(email);
    }

    return (
        <div className="App">
            <form className="MainBox" onSubmit={handleLogin}>
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
