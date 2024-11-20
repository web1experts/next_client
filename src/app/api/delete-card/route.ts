
import {NextResponse , NextRequest} from 'next/server';
import dbConnect from '../../../../config/dbConnect';
import cardModel from '../../../../model/cards';

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    // Parse the task ID from the query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log("id", id)

    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    // Delete the task from the database
    const deletedTask = await cardModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
