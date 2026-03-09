import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log("Error while connection", err);
    });
};

export default connectDb;
