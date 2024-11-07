document.addEventListener("DOMContentLoaded", onInit);

// Função para definir o cliente
function Cliente(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
}

// Função de inicialização que configura o evento de submissão do formulário
function onInit() {
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", cadastrarCliente);
}

// Função para processar o cadastro
function cadastrarCliente(event) {
    event.preventDefault();

    // Obtendo valores do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmarSenha = document.getElementById("confirmPassword").value;

    // Validação das senhas
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Cria uma nova instância de Cliente
    const novoCliente = new Cliente(nome, email, senha);

    // Obtém a lista de usuários cadastrados ou cria uma nova
    let listaUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    
    // Adiciona o novo usuário à lista
    listaUsuarios.push(novoCliente);

    // Salva a lista de volta no localStorage
    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaUsuarios));

    alert("Conta criada com sucesso!");
    window.location.href = "login.html";  // Redireciona para a página de login
}