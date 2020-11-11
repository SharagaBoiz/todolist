import $ from 'jquery';

import {deleteTodo} from "../deleteTodo/deleteTodo";

const axios = require('axios');

export async function showTodo(tokenUser, roomId) {
    const resGetTodoItem = await getTodoItem(tokenUser, roomId);
    deleteTodoItem();
    console.log(resGetTodoItem);
    let mas = resGetTodoItem.data.todolist;
    await printTodo(mas);
    console.log(mas);
    setDataId();
}

function setDataId(){
    $(document).ready(async () => {
        const deleteTodoItem = document.getElementsByClassName('todoitem__delete');
        for (let i = 0; i < deleteTodoItem.length; i++) {
            deleteTodoItem[i].addEventListener('click', (e) => deleteTodo(e))
        }
    });
}

function deleteTodoItem(){
    let item = document.querySelectorAll('.todoitem');
    item.forEach(item => item.remove());
}

async function getTodoItem(tokenUser, roomId) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenUser
        },
        url: 'http://vasilenko.fun:10500/api/todos/' + roomId + '/todolist/'
    };
    return axios(options);
}

async function printTodo(mas) {
mas.forEach(item=>{
    const html = `
        <div class="todoitem block">
            <h3>${item.title}</h3>
            <hr>
            <div class="todoitem__desc">${item.desc}</div>
            <input type="checkbox" class="todoitem__complete" value="${item.completed}">
            <div class="todoitem__delete" data-id="${item._id}">x</div>
        </div>
       `
    $("main" ).append(html);
})

}