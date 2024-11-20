"use client"; // This line ensures client-side rendering

import { useState, useEffect } from "react";
import { Task } from "../types";

export default function Home() {
  const [task, setTask] = useState<string>(""); // Current task input
  const [tasks, setTasks] = useState<Task[]>([]); // List of tasks
  const [adding, setAdding] = useState<boolean>(false); // Adding task loader

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/cards"); // Fetch from the GET API
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.map((task: {_id: string , cardName: string }) => ({id: task._id , cardName: task.cardName}))); // Extract card names
    } catch (error) {
      console.error("Error fetching tasks:", error);
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

  // Delete a task
  const deleteTask = async(taskId: string) => {
    try{
      const response = await fetch(`/api/delete-card?id=${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      await fetchTasks(); // Refresh the tasks list after adding
    }catch(error){
      console.log("error" , error)
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
      {(tasks && tasks.length > 0)&&
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.slice().reverse() .map((task, index) => (
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
              <span>{task.cardName}</span>
              <button
                onClick={() => deleteTask(task.id)}
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
      }
      
    </div>
  );
}
