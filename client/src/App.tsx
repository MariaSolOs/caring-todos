import React, { useState } from 'react';

// Add import to CSS here

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
            <div>
                <h3>Create a new todo</h3>
                <form onSubmit={handleTodoSubmit}>
                    <label htmlFor="todoTitle">Title</label>
                    <input 
                    id="todoTitle"
                    type="text" 
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="todoDescription">
                        Description
                    </label>
                    <input 
                    id="todoDescription"
                    type="text" 
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
                    <select 
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}>
                        <option value="WORK">Work</option>
                        <option value="SCHOOL">School</option>
                        <option value="FAM-FRIENDS">Family and friends</option>
                        <option value="SELF-CARE">Self-care</option>
                    </select>
                    <button type="submit">
                        Create todo
                    </button>
                </form>
            </div>
            <div>
                <h3>My todos</h3>
                <ul>
                    <li>
                    </li>
                </ul>
            </div>
        </div>
  );
}

export default App;
