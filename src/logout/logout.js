export function logout() {
    const html = `
        <input type="submit" id='btn-sign-in' value="Sign In" class="_btn-modal">
        <input type="submit" id='btn-sign-up' value="Sign Up" class="_btn-modal">
    `
    const profile = document.getElementById("header-right");
    profile.innerHTML = html;
    console.log('localStorage clear;')
    localStorage.clear();
}