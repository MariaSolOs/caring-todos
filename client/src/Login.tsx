import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Todo } from './models';

import './styles/Titles.css';
import './styles/Boxes.css';
import './styles/Buttons.css';
import './styles/Tabs.css';

const LOGIN_USER = gql`
    mutation LoginUser($email: String!) {
        login(email: $email) {
            todos {
                _id
                title
                description
                category
                completed
            }
        }
    }
`;

type Props = {
    setEmail: (email: string) => void;
    setTodos: (todo: Todo[]) => void;
}

const Login = (props: Props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');

    const [login, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted: ({ login }) => {
            props.setTodos(login.todos);
            props.setEmail(email);
            history.push('/dashboard');
        }
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login({ variables: { email } });
    }

    return (
        <div className="App">
            {loading || error?
            <p>
                Something went wrong!
            </p> :
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
            </form>}
        </div>
  );
}

export default Login;
