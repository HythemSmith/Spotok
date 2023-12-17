const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://longxuyen512vt:O3w6vipCsMB9dOmj@mycluster.ld5t5u3.mongodb.net/Spotok')
        .then(() => console.log('Connected!'));
    } catch ( error ) {
        console.log(error)
    }
    
}

module.exports = { connect }