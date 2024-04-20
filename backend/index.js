import express from "express";
import {PORT, mongodbURL} from './config.js';
import mongoose from "mongoose";
import {Book} from './Models/Bookmodel.js'
const app = express();


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to BookStore in MERN Stack');
});

app.post('/books', async (req, res) => {
try {
    if(
    !req.body.title||
    !req.body.author||
    !req.body.publishYear
    ){
        return res.status(400).send({message: 'Send all the required fiels : title, author, publishYear'});
    }

    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
} catch (error) {
    console.log(error);
    res.status(500).send({message: error.message});
}
})


mongoose.connect(mongodbURL)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
    
}).catch((error)=>{
    console.log('Error connecting to MongoDB',error);
});