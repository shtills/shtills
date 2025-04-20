
function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    if (login === 'Shtill' && password === 'V043Hkir4qP9k8pJ') {
        document.getElementById('auth').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        showSection('admin');
    } else {
        alert("Неверный логин или пароль");
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.panel-section');
    sections.forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}
