import {showTodo} from "../showTodo/showTodo";

const axios = require('axios');
let anime = 0;

// Функция удаления Todo по клику.
export async function deleteTodo(e){
    console.log(anime);
    const todoId = e.target.getAttribute('data-id');
    console.log(e.target.getAttribute('data-id'));
    const tokenUser = localStorage.getItem('tokenUser');
    const roomId = localStorage.getItem('roomId');
    try{
        const res = await fetchDeleteTodo(tokenUser, todoId)
        console.log(res);
    }
    catch (e) {
        console.log(e);
    }
    const resShowTodo = await showTodo(tokenUser,roomId);

}

// Вот тут сейчас падает запрос из-за того, что на коре он не разрешен.
async function fetchDeleteTodo(tokenUser, todoId){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenUser
        },
        url: 'http://vasilenko.fun:10500/api/todos/todolist/delete/' + todoId
    };
    return axios(options);
}