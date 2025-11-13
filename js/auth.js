// Auth.js — controle simples de login e logout com localStorage

function getUsers() {
  return JSON.parse(localStorage.getItem('aj_users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('aj_users', JSON.stringify(users));
}

// Criar conta
function signup() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) return alert('Preencha todos os campos.');

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    alert('Esse email já está cadastrado.');
    return;
  }

  users.push({ email, password });
  saveUsers(users);

  alert('Conta criada com sucesso!');
  window.location = 'login.html';
}

// Login
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert('Email ou senha incorretos.');

  localStorage.setItem('aj_logged', email);
  window.location = 'index.html';
}

// Verificação automática de login (para o dashboard)
(function() {
  const path = window.location.pathname;
  if (path.includes('index.html')) {
    const logged = localStorage.getItem('aj_logged');
    if (!logged) window.location = 'login.html';
  }
})();
