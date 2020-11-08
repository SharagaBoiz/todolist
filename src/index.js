import './index.css'
import './registration/registration.css'
import $ from 'jquery';

const axios = require('axios');
// Начинаю писать комментарии, дабы потом при разборе кода не очешуеть от него.
// Подключение функций открытия, закрытия и обработки при нажатий модальных окон. Там же в них лежит регистрация и авторизация.
import {openModalSignUp, closeModalSignUp, submitSignUpForm} from "./registration/registration";
import {openModalSignIn, closeModalSignIn, submitSignInForm, checkLogin} from "./login/login";
import {showMenu, outsideMenuClick} from "./profile/showProfile";
import {deleteTodo} from "./deleteTodo/deleteTodo";
//Функция добавления новой задачи.
import {addTodo} from "./addTodo/addTodo";
// Обработчики событий на регистрацию, авторизацию и закрытие модальных окон.
const btnModal = document.getElementById('btn-modal-open')
const signUp = document.getElementById('registration-content')
const signIn = document.getElementById('login-content')
const addTodoItem = document.getElementById('add-todo')


signUp.addEventListener('submit', submitSignUpForm)
signIn.addEventListener('submit', submitSignInForm)
addTodoItem.addEventListener('submit', addTodo)

$(document).ready(async () => {
    const res = await checkLogin();
    const deleteTodoItem = document.getElementsByClassName('todoitem__delete');
    for (let i = 0; i < deleteTodoItem.length; i++) {
        deleteTodoItem[i].addEventListener('click', (e) => deleteTodo(e))
    }
});




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
$('#profile').click(function () {
    showMenu()
});
document.addEventListener('click', outsideMenuClick);





