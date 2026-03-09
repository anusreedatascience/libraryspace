import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
let Book = mongoose.model("Book", bookSchema);

export default Book;
