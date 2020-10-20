import './index.css'
import './registration/registration.css'
import $ from 'jquery';
const axios = require('axios');
// Начинаю писать комментарии, дабы потом при разборе кода не очешуеть от него.
// Подключение функций открытия, закрытия и обработки при нажатий модальных окон. Там же в них лежит регистрация и авторизация.
import {openModalSignUp, closeModalSignUp, submitSignUpForm} from "./registration/registration";
import {openModalSignIn, closeModalSignIn, submitSignInForm} from "./login/login";

// Обработчики событий на регистрацию, авторизацию и закрытие модальных окон.
const btnModal = document.getElementById('btn-modal-open')
const signUp = document.getElementById('registration-content')
const signIn = document.getElementById('login-content')
signUp.addEventListener('submit', submitSignUpForm)
signIn.addEventListener('submit', submitSignInForm)
$('#registration-content__close-modal').click(function(){closeModalSignUp()});
$('#login-content__close-modal').click(function(){closeModalSignIn()});
$('#btn-sign-up').click(function(){openModalSignUp()});
$('#btn-sign-in').click(function(){openModalSignIn()});



