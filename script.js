
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!username || !password) return alert("Введите логин и пароль");

  if (users.find(u => u.username === username)) {
    return alert("Пользователь уже существует");
  }

  const role = users.length === 0 ? "superadmin" : "admin"; // первая регистрация = супер админ
  const user = { username, password, role };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Регистрация прошла успешно. Войдите.");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return alert("Неверный логин или пароль");

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  showDashboard();
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("admin-section").style.display = "none";
}

function showDashboard() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("admin-section").style.display = "block";
  document.getElementById("admin-info").innerText =
    "Вы вошли как: " + currentUser.username + " (" + (currentUser.role === "superadmin" ? "Главный админ" : "Админ") + ")";
  document.getElementById("role-label").innerText = currentUser.role === "superadmin" ? "Панель Главного Админа" : "Панель Админа";
}

if (currentUser) showDashboard();
