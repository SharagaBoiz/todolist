const {Schema, model} = require('mongoose');

const roomSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength:[2, 'too few letters'],
        maxlength:[50, 'too more letters'],
    },
    creater:{
        type: String,
        required: true,
    },
    userId: {
        type: Array,
    },
});

module.exports = model('Room', roomSchema);