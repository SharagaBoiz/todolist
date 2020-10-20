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
        console.log(res);
    } catch (e) {
        console.log(e);
    }

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
    return await axios.post('https://jsonplaceholder.typicode.com/posts/', {
        "user": {
            "login": login,
            "email": email,
            "name": name,
            "surname": surname,
            "password": password
        }
    })
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