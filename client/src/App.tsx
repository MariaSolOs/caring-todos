import React, { useState } from 'react';
import './Titles.css'
import './Boxes.css'
import './Buttons.css'

function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleTodoSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(title, description, category);
        // Maria sends todo info to server
    }

    return (
        <div className="App">
          <div className="MainBox">
            <h1 className="MainTitle">Work/Life Balance Inducing To-Do List</h1>
            <div className="Box">
                <h3 className="SubTitle">Create a New Task</h3>
                <form onSubmit={handleTodoSubmit}>
                    <label htmlFor="todoTitle" className="Paragraph">Title: </label>
                    <input className="Paragraph"
                    id="todoTitle"
                    type="text" 
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="todoDescription" className="Paragraph">
                        Description: 
                    </label>
                    <input className="Paragraph"
                    id="todoDescription"
                    type="text" 
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <select className="Paragraph"
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}>
                        <option value="WORK">Work</option>
                        <option value="SCHOOL">School</option>
                        <option value="FAM-FRIENDS">Family and Friends</option>
                        <option value="SELF-CARE">Self-care</option>
                    </select>
                    <button type="submit" className="SubmitButton">
                        Submit
                    </button>
                </form>
            </div>
            <div className="Box">
                <h3 className="SubTitle">My To-Do List</h3>
                <ul className="Paragraph">
                  <li>
                    test
                  </li>
                </ul>
            </div>
        </div>
        </div>
  );
}

export default App;
