const mongoose = require('mongoose');
const colors = require ('colors');

const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.Local_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgRed.white);
    } catch (error) {
        console.log(`DB Error ${error.message}`) 
    }
}

module.exports = connectdb;
