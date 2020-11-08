//модель для добавление в базу задач
const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength:[5, 'too few letters'],
        default: "Заголовок задачи",
        maxlength:[30, 'too more letters'],
    },
    desc: {
        type: String,
        required: true,
        default: "Описание задачи",
        minlength:[5, 'too few letters'],
        maxlength:[100, 'too more letters'],
    },
    completed: {
        type: Boolean,
        default: false,
       
    },
    roomId: {
        type: String,
        required: true,   
    }
});

module.exports = model('Todo',todoSchema);
