import { useState, useEffect } from 'react';
import './Todolist.css'; 

function Todolist() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [list, setList] = useState(savedTasks);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(list));
  }, [list]);

  const toggleStatus = (id) => {
    setList(list.map(item => 
      item.id === id ? { ...item, status: !item.status } : item
    ));
  };

  const deleteTask = (id) => {
    setList(list.filter(item => item.id !== id));
  };

  const addTask = () => {
    setList([
      ...list,
      { id: Date.now(), header: header, description: description, status: false }
    ]);
    setHeader('');
    setDescription('');
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        value={header}
        onChange={e => setHeader(e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Task Description"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {list.map(li => (
          <li key={li.id} style={{ position: 'relative' }}>
            <div>
              <h2 
                onClick={() => toggleStatus(li.id)} 
                style={{ textDecoration: li.status ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                {li.header}
              </h2>
              <p
                style={{ textDecoration: li.status ? 'line-through' : 'none'}}
              >
                {li.description}
              </p>
            </div>
            <button
              className="deleteButton" 
              onClick={() => deleteTask(li.id)} 
            >
              Del
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;