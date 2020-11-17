import $ from 'jquery';
import {showTodo} from "../showTodo/showTodo";
import {showProfile} from "../profile/showProfile";
import {userIsTrue} from "../index";
import {closeModalSignUp, openModalSignUp, submitSignUpForm} from "../registration/registration";
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


// Обработчик событий на кнопки.

export function loginIsFalse(){
    const signUp = document.getElementById('registration-content')
    const signIn = document.getElementById('login-content')
    signUp.addEventListener('submit', submitSignUpForm)
    signIn.addEventListener('submit', submitSignInForm)
    $('#registration-content__close-modal').click(function () {
        closeModalSignUp()
    });
    $('#login-content__close-modal').click(function () {
        closeModalSignIn()
    });
    $('#btn-sign-up').click(function () {
        openModalSignUp()
    });
    $('#btn-sign-in').click(function () {
        openModalSignIn()
    });
}

// Проверка на то, был ли залогинен пользователь ранее.

export async function checkLogin(){
    let tokenUser = localStorage.getItem('tokenUser');
    let login = localStorage.getItem('login');
    // Проверяем есть ли вообще токен и всё остальное в локальном хранилище у нашего пользователя.
    if(tokenUser != null && login != null){
        try{
            // Если результаты по всем запросам адекватны - идём дальше.
            const resGetRoomId = await getRoomId(tokenUser);
            const roomId = resGetRoomId.data.roomlist[0]._id;
            localStorage.setItem('roomId', roomId);
            const resShowTodo = await showTodo(tokenUser, roomId);
            showProfile(localStorage.getItem('login'));
            return true;
        }
        catch (e){
            console.log(e)
            return false;
        }

    }
    else return false;

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
        let tokenUser = res.data.user.token
        document.cookie="login="+login;
        localStorage.setItem('login', login);
        localStorage.setItem('tokenUser', tokenUser);
        showProfile(res.data.user.login)
        const allRoomId = await getRoomId(tokenUser);
        const roomId = allRoomId.data.roomlist[0]._id;
        console.log(allRoomId);
        const resShowTodo = await showTodo(tokenUser, roomId);
        userIsTrue();
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
// Поправить, как только Никитос даст мне адекватный ответ, как же всё таки он блять работает.
export async function getRoomId(tokenUser){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + tokenUser
        },
        url: 'http://vasilenko.fun:10500/api/rooms/roomlist'
    };
    return axios(options);
}

function resetForm(){
    $('.login-content__password-error').css('display', 'none');
}




