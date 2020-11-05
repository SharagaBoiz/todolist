import $ from 'jquery';
import {showTodo} from "../showTodo/showTodo";
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

// Запрос на авторизацию и его ответ.
export async function submitSignInForm(e){
    e.preventDefault();
    resetForm();
    const login = e.target.querySelector('#login-content__login').value;
    const password = e.target.querySelector('#login-content__password').value;
    try{
        const res = await fetchPostLogin(login,password);
        $('.login-content__password-success').css('display', 'block');
        console.log(res.data.user.token);
        setTimeout(()=>closeModalSignIn(), 1000);
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

function resetForm(){
    $('.login-content__password-error').css('display', 'none');
}




