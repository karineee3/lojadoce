document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Obtendo os valores dos campos
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Exibe a mensagem de sucesso
        successMessage.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;
        successMessage.classList.remove('d-none');

        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);

        // Limpa o formulário após o envio
        contactForm.reset();
    });
});
