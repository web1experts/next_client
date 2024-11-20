import { NextResponse } from 'next/server';
import dbConnect from '@/config/dbConnect';

// Handle GET request
export async function GET(request: Request) {
  await dbConnect();
  const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
  return NextResponse.json(users); // Return the users in JSON format
}


export async function POST(request: Request) {
  const data = await request.json(); // Parse the incoming JSON body

  console.log("data" , data)

  // You can now access the parsed data
  const newUser = { id: Date.now(), ...data };

  // Typically, you'd save this newUser to the database
  return NextResponse.json({ message: 'User created', user: newUser });
}