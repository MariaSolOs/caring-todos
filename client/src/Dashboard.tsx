import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Todo } from './models'; 

import Calendar from 'react-datepicker';
import Clock from 'react-clock';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-clock/dist/Clock.css';

import './styles/Titles.css';
import './styles/Boxes.css';
import './styles/Buttons.css';
import './styles/Tabs.css';
import './styles/calendar-clock.css';

const FETCH_RECIPE = gql`
    query GetRecipe {
        recipe {
            title
            ingredients
            steps
        }
    }
`;

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

const TOGGLE_TODO = gql`
    mutation ToggleTodo($todoId: ID!, $completed: Boolean!) {
        toggleTodo(todoId: $todoId, completed: $completed) {
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
    onTodoToggle: (todo: Todo) => void;
}

const todoCategories = [
    { value: 'WORK', displayText: 'Work' },
    { value: 'SCHOOL', displayText: 'School' },
    { value: 'FAM-FRIENDS', displayText: 'Family and Friends' },
    { value: 'SELF-CARE', displayText: 'Self-care' }
];

const randomFactor = Math.random();
const randomIndex = Math.floor(1643*randomFactor);

const Dashboard = (props: Props) => {
    // Fields for creating a todo
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('WORK');

    const [createTodo] = useMutation(CREATE_TODO, {
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

    // Toggle a todo
    const [toggleTodo] = useMutation(TOGGLE_TODO, {
        onCompleted: ({ toggleTodo }) => {
            props.onTodoToggle(toggleTodo);
        }
    });

    // Fetch random quote
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')
    useEffect(() => {
      fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        setQuote(data[randomIndex].text)
        setAuthor(data[randomIndex].author || 'Anonymous')
      })
    }, []);

    // Fetch random recipe
    const { data: recipeData, loading: recipeLoad, error: recipeErr } = 
        useQuery(FETCH_RECIPE);

    // To filter the todo list
    const [tab, setTab] = useState('WORK');

    console.log(recipeData)

    return (
        <div className="app-container">
            <div className="calendar">
                <Calendar
                readOnly
                inline
                disabled
                onChange={() => {}}
                selected={new Date()}/>
                <Clock value={new Date()}/>
            </div>
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
                            <input 
                            type="checkbox" 
                            checked={todo.completed}
                            onChange={(e) => toggleTodo({
                                variables: { 
                                    todoId: todo._id, 
                                    completed: e.target.checked 
                                }
                            })}/>
                            <span className="Paragraph">
                                {todo.title}: {todo.description}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {(recipeData && !recipeErr && !recipeLoad) &&
            <div className="RecipeBox">
                <h2 className="RecipeTitle">{recipeData.recipe.title}</h2>
                <div style={{ display: 'flex' }}>
                <ul>
                <h4 className="SmallTitle">Ingredients: </h4>
                    {recipeData.recipe.ingredients.map((ingred: string, i: number) => (
                        <li key={i} className="Paragraph">{ingred}</li>
                    ))}
                </ul>
                <ul>
                <h4 className="SmallTitle">Steps: </h4>
                    {recipeData.recipe.steps.map((step: string, i: number) => (
                        <li key={i} className="Paragraph">{step}</li>
                    ))}
                </ul>
            </div>
            </div>}
        </div>
        </div>
        </div>
        </div>
  );
}

export default Dashboard;
