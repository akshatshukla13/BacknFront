import mongoose from "mongoose";

const connectDB = async () => {
  //mongoose.connect('mongodb://127.0.0.1:27017/mongoose_test');
  try {
    mongoose.connection.on("connected", () => console.log("connected"));

    await mongoose
      .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      .then((resp) => {
        console.log(`connected at ${resp.connection.host}`);
      });
  } catch (error) {
    console.log("Express Not connected, Error: ", err);
  }
};

export default connectDB;
