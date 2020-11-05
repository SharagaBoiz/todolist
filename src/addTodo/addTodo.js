import {showTodo} from "../showTodo/showTodo";
const axios = require('axios');

export async function addTodo(e){
    e.preventDefault();
    const title = e.target.querySelector('#add-todo__title').value;
    const desc = e.target.querySelector('#add-todo__desc').value;
    const validator = new Validator(title, desc);
    try{
        const tokenUser = localStorage.getItem('tokenUser');
        const idRoom = localStorage.getItem('roomId');
        await fetchNewTodo(title, desc, tokenUser, idRoom);
        await showTodo(tokenUser, idRoom);
        console.log('succes')
    }
    catch (e) {
        console.log(e);
    }
}

async function fetchNewTodo(title, desc,tokenUser, idRoom){

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenUser
        },
        data: {
            "todo":{
                "title": title,
                "desc": desc
            }
        },
        url: 'http://vasilenko.fun:10500/api/todos/' + idRoom +'/todolist/add'
    };
    return axios(options);
}

class Validator{
    constructor(values) {
        if (!values) {
            throw new Error('Значений не было передано.')
        }
        this.values = values
    }
}