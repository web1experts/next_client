import { NextRequest , NextResponse } from 'next/server';
import dbConnect from '../../../../config/dbConnect';
import cardModel from '../../../../model/cards';


export async function POST(request: NextRequest) {
  try{
  await dbConnect(); // Connect to MongoDB
  const {cardName } = await request.json(); // Parse the incoming JSON body
  if (!cardName) {
    return NextResponse.json({ error: 'Card name is required' }, { status: 400 });
  }

  const newCard = new cardModel({ cardName });
  await newCard.save();
  // Typically, you'd save this newUser to the database
  return NextResponse.json({ message: 'card created', card: newCard });
  }catch(err){
    return NextResponse.json({ error: err }, { status: 500 });
  }
}


