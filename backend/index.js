import express from "express";
import {PORT, mongodbURL} from './config.js';
import mongoose from "mongoose";
import {Book} from './Models/Bookmodel.js'
import bookRoute from "./Routes/bookRoute.js";
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to BookStore in MERN Stack');
});

app.use('/books',bookRoute);

mongoose.connect(mongodbURL)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
    
}).catch((error)=>{
    console.log('Error connecting to MongoDB',error);
});