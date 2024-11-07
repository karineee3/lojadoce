document.getElementById('form-pagamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    let numeroCartao = document.getElementById('numero-cartao').value.trim();
    const dataExpiracao = document.getElementById('data-expiracao').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Remove espaços ou caracteres não numéricos do número do cartão
    numeroCartao = numeroCartao.replace(/\D/g, '');

    // Validação simples dos campos
    if (nome === '' || numeroCartao === '' || dataExpiracao === '' || cvv === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Validação do número do cartão (apenas números e tamanho)
    const numeroCartaoRegex = /^\d{16}$/;
    if (!numeroCartaoRegex.test(numeroCartao)) {
        alert('Número do cartão inválido. Deve conter 16 dígitos.');
        return;
    }

    // Validação da data de expiração (formato MM/AA)
    const dataExpiracaoRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!dataExpiracaoRegex.test(dataExpiracao)) {
        alert('Data de expiração inválida. Use o formato MM/AA.');
        return;
    }

    // Validação do CVV (apenas 3 dígitos)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        alert('CVV inválido. Deve conter 3 dígitos.');
        return;
    }

    // Simula o sucesso do pagamento
    alert('Obrigado pela compra!');

    // Redireciona para a página inicial após 2 segundos
    setTimeout(() => {
        window.location.href = "index.html"; // Redireciona para a página inicial
    }, 2000); // Atraso de 2000 ms (2 segundos)
});