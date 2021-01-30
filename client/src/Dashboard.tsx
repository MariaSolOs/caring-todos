import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Todo } from './models'; 

import './styles/Titles.css'
import './styles/Boxes.css'
import './styles/Buttons.css'
import './styles/Tabs.css'

const CREATE_TODO = gql`
    mutation CreateTodo($userEmail: String!, $title: String!, $description: String, $category: String) {
        createTodo(userEmail: $userEmail, title: $title, description: $description, category: $category) {
            _id
            title
            description
            category
            completed
        }
    }
`;

type Props = {
    email: string;
    todos: Todo[];
    onAddTodo: (todo: Todo) => void;
}

const Dashboard = (props: Props) => {
    // Fields for creating todo
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [createTodo, _] = useMutation(CREATE_TODO, {
        onCompleted: ({ createTodo }) => {
            props.onAddTodo(createTodo);
        }
    });

    const handleTodoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTodo({ 
            variables: { userEmail: props.email, title, description, category } 
        });
    }

    console.log(props.todos)

    return (
        <div className="App">
          <div className="MainBox">
            <h1 className="MainTitle">Work/Life Balance Inducing To-Do List</h1>
            <div className="Box">
                <h3 className="SubTitle">Create a New Task</h3>
                <form onSubmit={handleTodoSubmit}>
                    <label htmlFor="todoTitle" className="Paragraph">Title: </label>
                    <input className="TextBox"
                    id="todoTitle"
                    type="text" 
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="todoDescription" className="Paragraph">
                        Description: 
                    </label>
                    <input className="TextBox"
                    id="todoDescription"
                    type="text" 
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <select className="TextBox"
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}>
                        <option value="WORK">Work</option>
                        <option value="SCHOOL">School</option>
                        <option value="FAM-FRIENDS">Family and Friends</option>
                        <option value="SELF-CARE">Self-care</option>
                    </select>
                    <button type="submit" className="Button">
                        Submit
                    </button>
                </form>
            </div>
            <div className="TabBox">
                <h3 className="SubTitle">My To-Do List</h3>
                <div className="tab">
                  <button className="tablinks" >Work</button>
                  <button className="tablinks" >School</button>
                  <button className="tablinks" >Family and Friends</button>
                  <button className="tablinks" >Self-care</button>
                </div>
                <div className="TaskBox">
                    {props.todos.map((todo) => (
                        <div key={todo._id} className="Task">
                            <input type="checkbox"/>
                            <span className="Paragraph">{todo.title} - {todo.description}</span>
                        </div>
                    ))}
                  {/* <div className="Task">
                    <input type="checkbox" id="task1" name="task1" value="Task 1"></input>
                    <label htmlFor="task1" className="Paragraph"> Task 1</label>
                  </div>
                  <div className="Task">
                    <input type="checkbox" id="task2" name="task2" value="Task 2"></input>
                    <label htmlFor="task2" className="Paragraph"> Task 2</label>
                  </div> */}
                </div>
            </div>
        </div>
        </div>
  );
}

export default Dashboard;
