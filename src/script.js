
function showLogin() {
    document.getElementById('auth').classList.remove('hidden');
}
function showRegister() {
    alert("Регистрация временно недоступна.");
}
function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    if (login === 'Shtill' && password === 'V043Hkir4qP9k8pJ') {
        document.getElementById('auth').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
    } else {
        document.getElementById('auth').classList.add('hidden');
        document.getElementById('userPanel').classList.remove('hidden');
    }
}
