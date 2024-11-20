import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://reactcodder123:hitesh8183codder@cluster0.hbztk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const dbConnect = async () => {
  // Check if Mongoose is already connected
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:');
    throw new Error('Database connection failed');
  }
};

export default dbConnect;
