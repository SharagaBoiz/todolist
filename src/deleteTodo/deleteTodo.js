const axios = require('axios');


// Функция удаления Todo по клику.
export function deleteTodo(e){
    const todoId = e.target.getAttribute('data-id');
    console.log(e.target.getAttribute('data-id'));
    const tokenUser = localStorage.getItem('tokenUser');
    fetchDeleteTodo(tokenUser, todoId)
}

// Вот тут сейчас падает запрос из-за того, что на коре он не разрешен.
async function fetchDeleteTodo(tokenUser, todoId){
    const options = {
        method: 'DEL',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenUser
        },
        url: 'http://vasilenko.fun:10500/api/todos/todolist/delete/' + todoId
    };
    return axios(options);
}