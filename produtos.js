document.addEventListener('DOMContentLoaded', function () {
    const listaProdutos = document.getElementById('lista-produtos');

    // Recupera os produtos do localStorage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Limpa os produtos inválidos (caso existam)
    produtos = produtos.filter(produto => produto.nome && produto.preco > 0 && produto.imagem);

    // Exibe os produtos na página
    produtos.forEach(produto => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('col-md-4');
        divProduto.innerHTML = `
            <div class="card">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">${produto.descricao}</p>
                    <p class="card-text"><strong>Preço: R$ ${produto.preco.toFixed(2)}</strong></p>
                    <a href="#" class="btn btn-primary btn-add-carrinho" data-id="${produto.id}">Adicionar ao Carrinho</a>
                </div>
            </div>
        `;
        listaProdutos.appendChild(divProduto);
    });

    // Função para atualizar o contador do carrinho
    function atualizarCarrinho() {
        const contadorCarrinho = document.getElementById('contador-carrinho');
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        contadorCarrinho.textContent = carrinho.length;
    }

    // Função para adicionar produto ao carrinho
    function adicionarAoCarrinho(id) {
        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const produto = produtos.find(produto => produto.id === id);
        if (produto) {
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(produto);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinho();
            alert(`${produto.nome} foi adicionado ao carrinho.`);
        }
    }

    // Atualiza o contador do carrinho ao carregar a página
    atualizarCarrinho();

    // Evento de clique nos botões "Adicionar ao Carrinho"
    listaProdutos.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-carrinho')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            adicionarAoCarrinho(id);
        }
    });
});
