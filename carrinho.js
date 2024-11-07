document.addEventListener('DOMContentLoaded', function() {
    onInit(); // Chama a função onInit quando o DOM estiver carregado
});

// Recupera o carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Atualiza o contador do carrinho na navbar
const contadorCarrinho = document.getElementById('contador-carrinho');
if (contadorCarrinho) {
    contadorCarrinho.textContent = carrinho.length;
}

// Função para exibir os itens do carrinho
function mostrarCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    const totalElemento = document.getElementById('total');

    // Verifica se os elementos existem
    if (!carrinhoLista || !totalElemento) return;

    carrinhoLista.innerHTML = ''; // Limpa a lista antes de exibir

    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        carrinhoLista.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
        totalElemento.textContent = '0.00'; // Atualiza o total para 0
        return;
    }

    let total = 0; // Variável para calcular o total

    // Loop pelos itens do carrinho
    carrinho.forEach((produto, index) => {
        const produtoHTML = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">Preço: R$ ${produto.preco.toFixed(2)}</p>
                        <button class="btn btn-danger" onclick="removerDoCarrinho(${index})">Remover</button>
                    </div>
                </div>
            </div>`;
        carrinhoLista.innerHTML += produtoHTML; // Adiciona o produto à lista
        total += produto.preco; // Soma o preço do produto ao total
    });

    // Atualiza o total na página
    totalElemento.textContent = total.toFixed(2);
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    carrinho.push(produto); // Adiciona o produto ao carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    if (contadorCarrinho) {
        contadorCarrinho.textContent = carrinho.length; // Atualiza o contador
    }
    mostrarCarrinho(); // Atualiza a exibição do carrinho
}

// Função para remover um produto do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // Remove o produto pelo índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    mostrarCarrinho(); // Atualiza a exibição do carrinho
    if (contadorCarrinho) {
        contadorCarrinho.textContent = carrinho.length; // Atualiza o contador
    }
}

// Evento para finalizar a compra
const finalizarCompraBtn = document.getElementById('finalizar-compra');
if (finalizarCompraBtn) {
    finalizarCompraBtn.addEventListener('click', function () {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
        } else {
            window.location.href = "pagamento.html"; // Redireciona para a página de pagamento
        }
    });
}

// Inicializa a exibição dos itens do carrinho ao carregar a página
function onInit() {
    mostrarCarrinho(); // Chama para mostrar o carrinho ao inicializar
}