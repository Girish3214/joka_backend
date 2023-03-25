import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "JokaBackend",
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
