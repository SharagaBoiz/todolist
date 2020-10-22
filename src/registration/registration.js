import $ from 'jquery';
const axios = require('axios');

export function openModalSignUp() {
    $('#modal-sign-up').css('display', 'block');
    $('.modal-fade').fadeIn(500);
}

export function closeModalSignUp() {
    $('#modal-sign-up').css('display', 'none');
    $('.modal-fade').fadeOut(500);
}


export async function submitSignUpForm(e) {
    e.preventDefault();
    resetForm();
    const formValues = Array.from(e.target).reduce((prevent, current) => {
        if (current.attributes.type.value !== "submit") {
            prevent[current.attributes.name.value] = current.value
        }
        return prevent
    }, {});
    try {
        const validator = new Validator(formValues);
        validator
            .validateLogin()
            .validatePassword();
        const res = await fetchPost(formValues);
        console.log(res)
        // Занос токена в localStorage, но так же я его тут просто передаю напрямую, дабы создать комнату изменив токен из localStorage не представлялось возможным.
        let tokenUser = res.data.user.token;
        localStorage.setItem('tokenUser', tokenUser)
        await showFirstRoom(tokenUser);
    } catch (e) {
        console.log(e.response.data.message);
    }
}

// Создание и вывод комнаты после регистрации
async function createFirstRoom(tokenUser){
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'Authorization': 'Token ' + tokenUser},
        data: {
            "room":{
                "name":"Моя первая комната!"
            }
        },
        url: 'http://vasilenko.fun:10500/api/rooms/create'
    };
    return axios(options);
}

export async function showFirstRoom(tokenUser){
    const res = await createFirstRoom(tokenUser);
    console.log(res.data.room.name);
}


// Сброс выделений на полях формы и скрытие сообщений об ошибках.
function resetForm() {
    $('#registration-content__login').removeClass('input_error');
    $('#registration-content__password').removeClass('input_error');
    $('#registration-content__confirm-password').removeClass('input_error');
    $('.registration-content__login-error').css('display', 'none');
    $('.registration-content__confirm_password-error').css('display', 'none');
    $('.registration-content__password-error').css('display', 'none');
}

async function fetchPost({login, password, name, surname, email}) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
            "user": {
                "login": login,
                "email": email,
                "name": name,
                "soname": surname,
                "password": password
            }
        },
        url: 'http://vasilenko.fun:10500/api/users/signup/'
    };
    return axios(options);

}

class Validator {
    constructor(values) {
        if (!values) {
            throw new Error('Значений не было передано.')
        }
        this.values = values
    }

    validateLogin() {
        if (!this.values.login || this.values.login.length < 5) {
            $('.registration-content__login-error').css('display', 'block');
            $('#registration-content__login').addClass('input_error');
            throw new Error('Слишком короткий логин.')
        }
        return this;
    }

    validatePassword() {
        if (!this.values.password || this.values.password.length < 5) {
            $('.registration-content__password-error').css('display', 'block');
            $('#registration-content__password').addClass('input_error');
            throw new Error('Слишком короткий пароль')
        }
        if (this.values.confirm_password != this.values.password) {
            $('.registration-content__confirm_password-error').css('display', 'block');
            $('#registration-content__confirm-password').addClass('input_error');
            throw new Error('Пароли не совпадают.')
        }
        return this;
    }
}