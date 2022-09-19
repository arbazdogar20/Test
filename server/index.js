require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./config/db');
const userRouter = require('./routes/user.route');
const carRouter = require('./routes/car.route');

const app = express();
app.use(cors());
app.use(express.json());
database();
const PORT = process.env.PORT || 5000;

app.use('/api/user',userRouter);
app.use('/api/car',carRouter);

app.listen(PORT,() => console.log(`Server Is Running on Port: ${PORT}`));