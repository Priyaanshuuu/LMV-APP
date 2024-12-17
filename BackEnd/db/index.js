import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `MONGODB CONNECTED! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR:", error.message);
    throw error; // Ensure the promise rejects on error
  }
};

export default connectDB;

  