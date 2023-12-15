const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://SolidSphere:07072003@cluster0.xyifiha.mongodb.net/Spotok')
        .then(() => console.log('Connected!'));
    } catch ( error ) {
        console.log(error)
    }
    
}

module.exports = { connect }