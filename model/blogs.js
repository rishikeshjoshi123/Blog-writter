const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating Schema (Schema is the structure of data that has to be stored in database)
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });


// Creating model (model is used to save data in DB of Schema type)
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;