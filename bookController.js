import Book from "../models/book.model.js";

const bookController = {
  addBook: async (req, res) => {
    const { url, title, author } = req.body;

    if (!url || !title || !author) {
      return res.status(400).send({
        msg: "All fields are required",
      });
    }
    console.log(req.user);
    const { id } = req.user;
    try {
      const checkIsAval = await Book.findOne({ title: title });
      if (checkIsAval) {
        return res.status(200).send({ msg: "Books   already exists" });
      }
      const newBook = new Book({
        url,
        user: id,
        title,
        author,
      });
      await newBook.save();
      res.send({ msg: "Book added successfully" });
    } catch (error) {
      res.status(403).send({ err: error.message });
    }
  },
  getBookById: async (req, res) => {
    const { bookId } = req.params;
    const { id } = req.user;
    try {
      const singleBook = await Book.find({ _id: bookId, user: id });
      if (!singleBook) {
        return res.status(404).send({ msg: "Please enter a valid Id" });
      }
      res.status(200).json(singleBook);
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  },
  getAllBooks: async (req, res) => {
    const { id } = req.user;
    try {
      const allBooks = await Book.find({ user: id });
      if (!allBooks) {
        return res.status(200).send({ msg: "Empty" });
      }
      return res.status(200).json(allBooks);
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  },
  updateBook: async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findOne({
      _id: bookId,
      user: req.user.id
    });

    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }

    await Book.findByIdAndUpdate(bookId, {
      $set: req.body
    });

    res.send("Data updated successfully");

  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
},

  deleteBook: async (req, res) => {
    const { id } = req.user;
    try {
      let { bookId } = req.params;
      let book = await Book.findById({ _id: bookId, user: id });
      if (!book) {
        return res.status(404).send({ msg: "Book not found" });
      }

      await Book.findByIdAndDelete({ _id: bookId });
      res.status(200).send({ msg: "Book deleted successfully" });
    } catch (error) {
      res.send({ err: error.message });
    }
  },
};

export default bookController;
