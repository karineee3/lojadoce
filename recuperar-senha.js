document.addEventListener('DOMContentLoaded', function() {
    const recuperarSenhaForm = document.getElementById('recuperarSenhaForm');

    recuperarSenhaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('emailRecuperar').value;

        // Recupera os usuários registrados no localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verifica se o email existe no banco de dados local (localStorage)
        const usuario = usuarios.find(usuario => usuario.email === email);

        if (usuario) {
            alert('Um link para recuperação de senha foi enviado para seu email.');
            // Aqui você poderia enviar um email real ou gerar um link de recuperação

            // Redirecionar para a página de login após o envio do link
            window.location.href = 'login.html';
        } else {
            alert('Email não encontrado. Verifique e tente novamente.');
        }
    });
});
