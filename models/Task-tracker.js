const mongoose = require('mongoose');

const TaskTrackerSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Please provide title'],
        minlength: 3,
        maxlength: 50,
    }, 
    description: {
        type: String, 
        required: [true, 'Please provide description min 5, max 255'],
        minlength: 3,
        maxlength: 255,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    status: {
        type: String,
        enum: {
          values: ['pending', 'in-progress', 'completed'],
          message: '{VALUE} is not supported',
        }, 
        default: 'pending',
    },
    deadline: {
        type: Date, 
        default: Date.now,
    },
    proiority: {
        type: String,
        enum: {
          values: ['high', 'medium', 'low'],
          message: '{VALUE} is not supported',
        }, 
        default: 'medium',
    }
}, 
{ timestamps: true })


module.exports = mongoose.model('TaskTracker', TaskTrackerSchema)