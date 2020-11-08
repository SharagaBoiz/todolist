import $ from 'jquery';
import {showTodo} from "../showTodo/showTodo";
import {showProfile} from "../profile/showProfile";
const axios = require('axios');

// Модальные окна и их появление/закрытие.
export function openModalSignIn() {
    $('#modal-sign-in').css('display','block');
    $('.modal-fade').fadeIn(500);
}
export function closeModalSignIn() {
    $('#modal-sign-in').css('display','none');
    $('.modal-fade').fadeOut(500);
}
// Проверка на то, был ли залогинен пользователь ранее.



export async function checkLogin(){
    let tokenUser = localStorage.getItem('tokenUser');
    showProfile(localStorage.getItem('login'));
    const res = await showTodo(localStorage.getItem('tokenUser'), localStorage.getItem('roomId'));
}

// Запрос на авторизацию и его ответ.
export async function submitSignInForm(e){
    e.preventDefault();
    resetForm();
    const login = e.target.querySelector('#login-content__login').value;
    const password = e.target.querySelector('#login-content__password').value;
    try{
        const res = await fetchPostLogin(login,password);
        $('.login-content__password-success').css('display', 'block');
        console.log(res.data.user);

        // const resRoomId = await getRoomId(res.data.user.token);
        // console.log(resRoomId);
        document.cookie="login="+login;
        localStorage.setItem('login', login);
        showProfile(res.data.user.login)
        setTimeout(()=>closeModalSignIn(), 500);
    }
    catch(e){
        $('.login-content__password-error').css('display', 'block');
        console.log('nope');
    }

}

async function fetchPostLogin(login, password){
    return axios.post('http://vasilenko.fun:10500/api/users/signin/',
        {
            "user": {
                "login": login,
                "password": password
            }
        });
}
// Получение ID комнат по данным пользователя.
// async function getRoomId(tokenUser){
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token ' + tokenUser
//         },
//         url: 'http://vasilenko.fun:10500/api/rooms/roomlist'
//     };
//     return axios(options);
// }

function resetForm(){
    $('.login-content__password-error').css('display', 'none');
}




