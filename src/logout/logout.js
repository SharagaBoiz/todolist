import $ from 'jquery';
import {outsideMenuClick} from "../profile/showProfile";

export function logout() {
    const html = `
        <input type="submit" id='btn-sign-in' value="Sign In" class="_btn-modal">
        <input type="submit" id='btn-sign-up' value="Sign Up" class="_btn-modal">
    `
    const main = ''
    const profile = document.getElementById("header-right");
    const mainContent = document.getElementById("main");
    profile.innerHTML = html;
    mainContent.innerHTML = main;
    console.log('logOut function;')
    localStorage.clear();
    document.removeEventListener('click', outsideMenuClick);
}