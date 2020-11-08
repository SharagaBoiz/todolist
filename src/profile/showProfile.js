import $ from 'jquery';

import './showProfile.css'

// Вывод панельки с профилем и меню.
export function showProfile(login) {
    console.log(login)
    const html = `
    <div id="profile">
        <div class="profile__login">${login}</div>
        <div class="profile__invite">+</div>
    </div>
    <ul id="menu">
        <li id="menu_add-user" class="_menu-item">Пригласить в комнату</li>
        <li id="menu__quit" class="_menu-item">Выход</li>
    </ul>
    `
    const profile = document.getElementById("header-right");
    profile.innerHTML = html;
}

// Функция показа меню.
export function showMenu() {
    let display = $('#menu').css('display');
    if (display === 'block') {
        $('#menu').hide();
    } else {
        $('#menu').show();
    }
}

// Функция на закрытие меню при клике вне меню.
export function outsideMenuClick() {

    const el = document.getElementById('menu');
    const profile = document.getElementById('profile');
    document.addEventListener('click', outsideEvtListener);

    function outsideEvtListener(evt) {
        if (evt.target === el || el.contains(evt.target) || (evt.target === profile) || profile.contains(evt.target)) {
            return;
        }
        if ($('#menu').css('display') === 'block') $('#menu').hide();

        document.removeEventListener('click', outsideEvtListener);
    }
}


