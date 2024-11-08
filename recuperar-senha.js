document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recuperarSenhaForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("emailRecuperar").value.trim();

        if (validarEmail(emailInput)) {
            if (enviarEmailRecuperacao(emailInput)) {
                exibirMensagem("Um link para redefinir sua senha foi enviado para o email.", "success");
            } else {
                exibirMensagem("Email não encontrado em nosso sistema.", "danger");
            }
        } else {
            exibirMensagem("Por favor, insira um email válido.", "warning");
        }
    });

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function enviarEmailRecuperacao(email) {
        // Simulação de envio de email e validação.
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
        return usuariosRegistrados.some(usuario => usuario.email === email);
    }

    function exibirMensagem(mensagem, tipo) {
        const container = document.querySelector(".container");
        const alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${tipo} mt-3`;
        alertDiv.textContent = mensagem;

        container.insertBefore(alertDiv, container.firstChild);

        setTimeout(() => alertDiv.remove(), 5000);
    }
});

