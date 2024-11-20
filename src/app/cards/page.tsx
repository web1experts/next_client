"use client"; // This line ensures client-side rendering

import { useState, useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState<string>(""); // Current task input
  const [tasks, setTasks] = useState<string[]>([]); // List of tasks
  const [loading, setLoading] = useState<boolean>(true); // Loader state
  const [adding, setAdding] = useState<boolean>(false); // Adding task loader

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true); // Show loader
    try {
      const response = await fetch("/api/cards"); // Fetch from the GET API
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.map((task: { cardName: string }) => task.cardName)); // Extract card names
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Fetch tasks on initial render
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new card via the API and refresh tasks
  const addTask = async () => {
    if (task.trim() === "") return; // Ignore empty tasks
    setAdding(true); // Show loader for adding a task

    try {
      const response = await fetch("/api/add-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardName: task }), // Send cardname in the request body
      });

      if (!response.ok) throw new Error("Failed to add task");
      await fetchTasks(); // Refresh the tasks list after adding
      setTask(""); // Clear the input
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setAdding(false); // Hide adding loader
    }
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
            color: "#000"
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
            cursor: adding ? "not-allowed" : "pointer",
            opacity: adding ? 0.7 : 1,
          }}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add a card"}
        </button>
      </div>

      {/* Show loader while fetching tasks */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
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
            </li> 
          ))}
        </ul>
      )}
    </div>
  );
}
