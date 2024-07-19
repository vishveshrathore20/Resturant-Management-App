const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectdb = require('./config/db');

//rest object of express
const app =  express();

//config env
dotenv.config();

//database
connectdb();

//middleware
app.use(cors({
    target:"http://localhost:5173"
}));
app.use(express.json());
app.use(morgan('dev'));

//route
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to Server</h1>")
})

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}`.bgMagenta.white)
})