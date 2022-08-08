import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(() =>bodyParser.json({limit:'32mb', extended:true}));
app.use(() =>bodyParser.urlencoded({limit:'32mb', extended:true}));
app.use(cors());

const MONGO_URI = '';
const PORT = process.env.PORT || 3001;

const connectDb = async () =>{
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log('Up and running'));
    } catch (error) {
        console.log('Connection to mongodb failed', error.message);
    }
}

connectDb();
mongoose.connection.on('open', () => console.log('Database connected'));
mongoose.connection.on('error', (e) => console.log(e));
