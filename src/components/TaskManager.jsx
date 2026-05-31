const TaskManager = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: 'high'
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="glass-panel task-widget">
      <h2>Missions Prioritaires</h2>
      
      <form onSubmit={addTask} className="task-form">
        <input 
          type="text" 
          className="glass-input" 
          placeholder="Nouvelle tâche..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="btn-primary">+</button>
      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label className="task-label">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)} 
              />
              <span className="custom-checkbox"></span>
              <span className="task-text">{task.text}</span>
            </label>
            <button className="delete-btn" onClick={() => removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
