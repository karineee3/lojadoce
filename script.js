document.addEventListener('DOMContentLoaded', function () {
    // Função para atualizar o contador do carrinho
    function atualizarCarrinho() {
        const contadorCarrinho = document.getElementById('contador-carrinho');
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        contadorCarrinho.textContent = carrinho.length;
    }

    // Função para adicionar produto ao carrinho
    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    // Função para inscrever-se na newsletter
    const formNewsletter = document.querySelector('form');
    formNewsletter.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailInput = document.getElementById('email');
        const email = emailInput.value;

        if (!email) {
            document.getElementById('message').textContent = "Por favor, insira um e-mail válido!";
            return;
        }

        // Simulação de envio do email
        document.getElementById('message').textContent = `Obrigado por se inscrever, ${email}!`;

        // Limpar campo de e-mail após inscrição
        emailInput.value = '';
    });

    // Chamada inicial para atualizar o carrinho quando a página carregar
    atualizarCarrinho();
});
