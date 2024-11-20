
"use client"; // Add this at the very top of the file
import {useEffect } from 'react';

export default function About() {

  useEffect(() => {
    console.log("about")
    async function fetchUsers() {
      const res = await fetch('/api/users');
      console.log("res" , res)
      const data = await res.json();
     console.log("data" , data)
    }
    fetchUsers();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h3> About page </h3>

      <p> i am learing Next js </p>
    </div>
  );
}
