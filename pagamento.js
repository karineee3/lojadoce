document.addEventListener("DOMContentLoaded", function() {
    // Elementos do formulário
    const tipoPagamento = document.getElementById("tipo-pagamento");
    const cartao = document.getElementById("cartao");
    const marcaCartao = document.getElementById("marca-cartao");
    const qrCodePix = document.getElementById("qr-code-pix");

    // Função para atualizar os campos visíveis dependendo do método de pagamento
    tipoPagamento.addEventListener("change", function() {
        const metodoSelecionado = tipoPagamento.value;

        if (metodoSelecionado === "cartao") {
            // Exibe os campos para cartão de crédito/débito
            cartao.style.display = "block";
            marcaCartao.style.display = "none";
            qrCodePix.style.display = "none";
        } else if (metodoSelecionado === "pix") {
            // Exibe o QR Code do Pix
            cartao.style.display = "none";
            marcaCartao.style.display = "none";
            qrCodePix.style.display = "block";
        } else {
            // Oculta todos os campos
            cartao.style.display = "none";
            marcaCartao.style.display = "none";
            qrCodePix.style.display = "none";
        }
    });

    // Função para exibir o campo de marca do cartão quando um tipo de cartão for selecionado
    const tipoCartao = document.getElementById("tipo-cartao");
    tipoCartao.addEventListener("change", function() {
        if (tipoCartao.value === "credito" || tipoCartao.value === "debito") {
            marcaCartao.style.display = "block";
        } else {
            marcaCartao.style.display = "none";
        }
    });

    // Validação e envio do formulário de pagamento
    document.getElementById('form-pagamento').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obtém os valores dos campos do formulário
        const nome = document.getElementById('nome').value.trim();
        let numeroCartao = document.getElementById('numero-cartao').value.trim();
        const dataExpiracao = document.getElementById('data-expiracao').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        // Remove espaços ou caracteres não numéricos do número do cartão
        numeroCartao = numeroCartao.replace(/\D/g, '');

        // Adicionando um log para depurar o número do cartão
        console.log('Número do Cartão:', numeroCartao); // Verifica o número do cartão após a remoção dos não numéricos

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
});


