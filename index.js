// import express
import express from "express";

// create instance of express app
const app = express();

// use json to parse data
app.use(express.json());

// initialize an array to store books data
const books = [];

// home route
app.get("/", (request, response) => {
    response.send("Welcome to Camelot")
})
// create a new book route
app.post("/books", (request, response) => {
    const {title, author, genre} = request.body;
    const newBook = {id: books.length + 1, title, author, genre};
    books.push(newBook);
    response.status(201).json(newBook);
})
// get all books route
app.get("/books", (request, response) => {
    response.json(books)
})
// get a specific book
app.get("/books/:id", (request, response) => {
    const bookId = parseInt(request.params.id)
    const book = books.find(b => b.id === bookId)
    if (book) {
        response.json(book)
    }
    else{
        response.status(404).json({message: "book not found"})
    }
})
// update a book
app.put("/books/:id",(request, response) => {
    const bookId = parseInt(request.params.id)
    const book = books.find(b => b.id === bookId)
    if(book){
        response.json(book)
    }
    else{
        response.status(404).json({message: "book not found"})
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;

    response.status(200).json(book)
})

//delete a specific book
app.delete("/books/:id", (request, response) => {
    const bookId = parseInt(request.params.id)
    const book = books.find(b => b.id === bookId)
    if(book){
        response.json(book)
    }
    else{
        response.status(404).json({message: "book not found"})
    }
    response.status(204).json({message: "book deleted"})
})
// listen for port
app.listen(3000, () => {
    console.log("good to go")
})

