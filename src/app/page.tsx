"use client"; // Add this line at the top of the file

import { useState , useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);



  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/cards"); // Fetch from the GET API
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        console.log("data" , data)
        setTasks(data.map((task: { cardName: string }) => task.cardName)); // Extract card names
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  // const addTask = () => {
  //   if (task.trim() === "") return;
  //   setTasks([...tasks, task]);
  //   setTask("");
  // };


  const addTask = async () => {
    if (task.trim() === "") return; // Ignore empty tasks

    try {
      const response = await fetch("/api/add-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardName: task }), // Send cardname in the request body
      });

      if (!response.ok) throw new Error("Failed to add task");
      setTasks([...tasks, task]); // Add the new task to the list
      setTask(""); // Clear the input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1> My List</h1>
      
      {/* Input for new task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            marginRight: "10px",
            color:"#000"
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",

          }}
        >
          Add a card
        </button>
      </div>

      {/* List of tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
              color: "#000"
            }}
          >
            <span>{task}</span>
            <button
              onClick={() => deleteTask(index)}
              style={{
                padding: "5px 10px",
                fontSize: "14px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

