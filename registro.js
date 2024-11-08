document.addEventListener("DOMContentLoaded", onInit);

function Cliente(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
}

function onInit() {
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", cadastrarCliente);
}

function cadastrarCliente(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmarSenha = document.getElementById("confirmPassword").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const novoCliente = new Cliente(nome, email, senha);
    let listaUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    listaUsuarios.push(novoCliente);
    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaUsuarios));

    $('#sucessoModal').modal('show'); // Exibe o modal de sucesso
}
