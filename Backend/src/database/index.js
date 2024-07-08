import mongoose from "mongoose";

const connectDB = async () => {
  //mongodb+srv://vijaynarayanshukla9:BaupnSXmTK3sJQ3E@cluster0.maavplo.mongodb.net/
  try {
mongoose.connection.on("connected", () => console.log("connected"));

    await mongoose
      .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      .then((resp) => {
        console.log(`connected at ${resp.connection.host}`);
      });
      
  } catch (error) {
    console.log("Express Not connected, Error: ", error);
  }
};

export default connectDB;
