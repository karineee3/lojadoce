// contato.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Obtendo os valores dos campos
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Aqui você pode adicionar o código para enviar os dados para um servidor
        // Para este exemplo, vamos apenas exibir uma mensagem de sucesso
        alert(`Mensagem enviada com sucesso!\n\nNome: ${name}\nEmail: ${email}\nMensagem: ${message}`);

        // Limpar o formulário após o envio
        contactForm.reset();
    });
});