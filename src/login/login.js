import $ from 'jquery';
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
    const login = e.target.querySelector('#login-content__login').value;
    const password = e.target.querySelector('#login-content__password').value;
    const res = await fetchPostLogin(login,password);
    console.log(res);
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
    $('#login-content__login').removeClass('input_error');
    $('#login-content__password').removeClass('input_error');
    $('.login-content__password-error error').css('display', 'none');
}



