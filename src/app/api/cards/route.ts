
import {NextResponse } from 'next/server';
import dbConnect from '../../../../config/dbConnect';
import cardModel from '../../../../model/cards';

export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB

    const cards = await cardModel.find();
    return NextResponse.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}



