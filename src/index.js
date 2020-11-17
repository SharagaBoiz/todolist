import './index.css'
import './registration/registration.css'
import $ from 'jquery';

const axios = require('axios');
// Начинаю писать комментарии, дабы потом при разборе кода не очешуеть от него.
// Подключение функций открытия, закрытия и обработки при нажатий модальных окон. Там же в них лежит регистрация и авторизация.
import {openModalSignUp, closeModalSignUp, submitSignUpForm} from "./registration/registration";
import {openModalSignIn, closeModalSignIn, submitSignInForm, checkLogin, getRoomId, loginIsFalse} from "./login/login";
import {showMenu, outsideMenuClick} from "./profile/showProfile";
import {logout} from "./logout/logout";
//Функция добавления новой задачи.
import {addTodo} from "./addTodo/addTodo";
// Обработчики событий на регистрацию, авторизацию и закрытие модальных окон.



const addTodoItem = document.getElementById('add-todo')



addTodoItem.addEventListener('submit', addTodo)






$(document).ready(async () => {
    const res = await checkLogin();
    res ? userIsTrue() : userIsFalse();
    console.log(res)
});

// Функция если по запросам всё очень даже хорошо.
export function userIsTrue() {
    console.log('succes')
    const profile = document.getElementById('profile');
    profile.addEventListener('click', showMenu);
    document.addEventListener('click', outsideMenuClick);
    const logoutBtn = document.getElementById('menu__logout');
    logoutBtn.addEventListener('click', ()=>{logout(); loginIsFalse()});
}

// Функция на отображение, если по запросам ошибка.
function userIsFalse() {
    console.log('Fail')
    loginIsFalse();
}











