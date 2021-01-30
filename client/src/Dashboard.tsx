import React, { useState, useEffect } from 'react';
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
    allTodos: Todo[];
    onAddTodo: (todo: Todo) => void;
}

const todoCategories = [
    { value: 'WORK', displayText: 'Work' },
    { value: 'SCHOOL', displayText: 'School' },
    { value: 'FAM-FRIENDS', displayText: 'Family and Friends' },
    { value: 'SELF-CARE', displayText: 'Self-care' }
];

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

    const randomFactor = Math.random();
    const randomIndex = Math.floor(1643*randomFactor);

    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
      fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        setQuote(data[randomIndex].text)
        setAuthor(data[randomIndex].author)
      })

    }, []);
  
    // To filter the todo list
    const [tab, setTab] = useState('WORK');

    return (
        <div className="App">
          <div className="MainBox">

            <h1 className="MainTitle">"{quote}" by {author}</h1>

            <div className="flex-container">
            <div className="flex-child magenta">
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
                        {todoCategories.map(({ value, displayText }) => (
                            <option 
                            key={value} 
                            value={value}>
                                {displayText}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="Button">
                        Submit
                    </button>
                </form>
                <h3 className="SubTitle">Task List</h3>
                <div className="tab">
                    {todoCategories.map(({ value, displayText }) => (
                        <button 
                        key={value} 
                        className="tablinks"
                        onClick={() => setTab(value)}>
                            {displayText}
                        </button>
                    ))}
                </div>
                <div className="TaskBox">
                    {props.allTodos.filter(({ category }) => category === tab).map((todo) => (
                        <div key={todo._id} className="Task">
                            <input type="checkbox"/>
                            <span className="Paragraph">
                                {todo.title}: {todo.description}
                            </span>
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
