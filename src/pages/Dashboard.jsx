import { useState } from "react";

function Dashboard() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(
    currentUser?.tasks || []
  );

  const addTask = () => {
    if (!task) return;

    const updatedTasks = [
      ...tasks,
      {
        title: task,
        completed: false,
      },
    ];

    setTasks(updatedTasks);

    const users = JSON.parse(
      localStorage.getItem("users")
    );

    const updatedUsers = users.map(
      (user) =>
        user.email === currentUser.email
          ? {
              ...user,
              tasks: updatedTasks,
            }
          : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        tasks: updatedTasks,
      })
    );

    setTask("");
  };

  return (
    <div>
      <h1>
        Welcome {currentUser?.name}
      </h1>

      <input
        value={task}
        placeholder="New Task"
        onChange={(e) =>
          setTask(e.target.value)
        }
      />

      <button onClick={addTask}>
        Add Task
      </button>

      {tasks.map((task, index) => (
        <div key={index}>
          {task.title}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;