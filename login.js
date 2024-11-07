document.addEventListener("DOMContentLoaded", onInit);

// Função de inicialização
function onInit() {
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", fazerLogin);
}

// Função para verificar login
function fazerLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    // Recupera a lista de usuários registrados
    const listaUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    
    // Verifica se há algum usuário com o email e senha fornecidos
    let usuarioEncontrado = listaUsuarios.find(usuario => usuario.email === email && usuario.senha === senha);

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";  // Redireciona para a página inicial
    } else {
        alert("Conta não registrada ou informações incorretas.");
    }
}