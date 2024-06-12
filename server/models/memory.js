const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    image: String,
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model('Memory', memorySchema);
