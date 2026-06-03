import { useState, useEffect } from "react";
import "./App.css";

const CATEGORIES = ["Work", "Personal", "Shopping", "Others"];
const PRIORITIES = ["Low", "Medium", "High"];

function App() {
  // Initialize state from localStorage if it exists, otherwise use defaults
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todo_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: "1", text: "Setup project repository", category: "Work", priority: "Medium", dueDate: "2026-06-10", status: "pending" },
      { id: "2", text: "Buy milk and eggs", category: "Shopping", priority: "Low", dueDate: "2026-06-04", status: "pending" },
      { id: "3", text: "Gym workout session", category: "Personal", priority: "High", dueDate: "2026-06-03", status: "completed" },
    ];
  });

  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // Sync tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text,
      category,
      priority,
      dueDate: dueDate || "No due date",
      status: "pending",
    };

    setTasks([...tasks, newTask]);
    setText("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="app-container">
      <h1>To - Do</h1>

      {/* Advanced Task Form */}
      <form onSubmit={addTask} className="task-form">
        <div className="form-row main-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add</button>
        </div>
        
        <div className="form-row meta-row">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((prio) => (
              <option key={prio} value={prio}>{prio} Priority</option>
            ))}
          </select>

          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
          />
        </div>
      </form>

      {/* Kanban Columns */}
      <div className="board">
        {/* Pending */}
        <div className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "pending")}>
          <h2>Pending ({pendingTasks.length})</h2>
          <div className="task-list">
            {pendingTasks.map((task) => (
              <div key={task.id} className="task-card" draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                <div className="task-header">
                  <div className="badges">
                    <span className={`tag ${task.category.toLowerCase()}`}>{task.category}</span>
                    <span className={`prio-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">✕</button>
                </div>
                <p className="task-text">{task.text}</p>
                <div className="task-footer">
                  <span className="due-date-display">📅 {task.dueDate}</span>
                  <small className="drag-hint">⋮⋮ Drag me</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "completed")}>
          <h2>Completed ({completedTasks.length})</h2>
          <div className="task-list">
            {completedTasks.map((task) => (
              <div key={task.id} className="task-card completed" draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                <div className="task-header">
                  <div className="badges">
                    <span className={`tag ${task.category.toLowerCase()}`}>{task.category}</span>
                    <span className={`prio-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                  </div>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">✕</button>
                </div>
                <p className="task-text">{task.text}</p>
                <div className="task-footer">
                  <span className="due-date-display">📅 {task.dueDate}</span>
                  <small className="drag-hint">⋮⋮ Drag me</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;