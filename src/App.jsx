import { useState } from "react";
import "./App.css";

const CATEGORIES = ["Work", "Personal", "Shopping", "Others"];

function App() {
  const [tasks, setTasks] = useState([
    { id: "1", text: "Setup project repository", category: "Work", status: "pending" },
    { id: "2", text: "Buy milk and eggs", category: "Shopping", status: "pending" },
    { id: "3", text: "Gym workout session", category: "Personal", status: "completed" },
  ]);

  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");

  // Handle adding a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text,
      category,
      status: "pending",
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, targetStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    
    // Update the status of the dragged task
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );
  };

  // Filter tasks into columns
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="app-container">
      <h1> To - Do Lists </h1>

      {/* Task Form */}
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Columns Board */}
      <div className="board">
        {/* Pending Column */}
        <div
          className="column text-center"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pending")}
        >
          <h2>Pending ({pendingTasks.length})</h2>
          <div className="task-list">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="task-card"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                <div className="task-header">
                  <span className={`tag ${task.category.toLowerCase()}`}>
                    {task.category}
                  </span>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">
                    ✕
                  </button>
                </div>
                <p className="task-text">{task.text}</p>
                <small className="drag-hint">⋮⋮ Drag me</small>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div
          className="column text-center"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "completed")}
        >
          <h2>Completed ({completedTasks.length})</h2>
          <div className="task-list">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="task-card completed"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                <div className="task-header">
                  <span className={`tag ${task.category.toLowerCase()}`}>
                    {task.category}
                  </span>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">
                    ✕
                  </button>
                </div>
                <p className="task-text">{task.text}</p>
                <small className="drag-hint">⋮⋮ Drag me</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;