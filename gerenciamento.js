document.addEventListener('DOMContentLoaded', function () {
    // Carregar produtos do localStorage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Função para listar os produtos
    function listarProdutos() {
        const listaDiv = document.getElementById('listaProdutos');
        listaDiv.innerHTML = ''; // Limpa a lista para atualizá-la

        if (produtos.length === 0) {
            listaDiv.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }

        // Exibe os produtos
        produtos.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto-item');
            produtoDiv.innerHTML = `
                <h5>${produto.nome}</h5>
                <p>${produto.descricao}</p>
                <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                <img src="${produto.imagem}" alt="${produto.nome}" width="100">
            `;
            listaDiv.appendChild(produtoDiv);
        });
    }

    // Função para cadastrar um produto
    function cadastrarProduto(event) {
        event.preventDefault();

        const nomeProduto = document.getElementById('nomeProduto').value;
        const descricaoProduto = document.getElementById('descricaoProduto').value;
        const precoProduto = document.getElementById('precoProduto').value;
        const imagemProduto = document.getElementById('imagemProduto').files[0];

        // Validação dos campos
        if (!nomeProduto || !descricaoProduto || !precoProduto || !imagemProduto) {
            alert('Todos os campos devem ser preenchidos corretamente!');
            return;
        }

        if (isNaN(precoProduto) || precoProduto <= 0) {
            alert('Por favor, insira um preço válido!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function () {
            const produto = {
                id: Date.now(), // Gera um ID único com o timestamp
                nome: nomeProduto,
                descricao: descricaoProduto,
                preco: parseFloat(precoProduto),
                imagem: reader.result,
            };

            // Verifica se já existe um produto com o mesmo nome
            if (produtos.some(p => p.nome.toLowerCase() === produto.nome.toLowerCase())) {
                alert('Produto com esse nome já existe!');
                return;
            }

            produtos.push(produto);
            localStorage.setItem('produtos', JSON.stringify(produtos));

            document.getElementById('cadastroProduto').reset();
            alert('Produto cadastrado com sucesso!');
            listarProdutos();
        };

        reader.readAsDataURL(imagemProduto);
    }

    // Função para editar um produto
    function editarProduto(event) {
        event.preventDefault();
        const nomeProduto = document.getElementById('novoNomeProduto').value.trim().toLowerCase();
        const descricaoProduto = document.getElementById('novaDescricaoProduto').value;
        const precoProduto = parseFloat(document.getElementById('novoPrecoProduto').value);
        const imagemProduto = document.getElementById('novaImagemProduto').files[0];

        if (!nomeProduto) {
            alert('Por Favor, insira o nome do produto!');
            return;
        }

        if (nome) produtos[produtoIndex].nome = nome;
        if (descricao) produtos[produtoIndex].descricao = descricao;
        if (preco) produtos[produtoIndex].preco = preco;

        if (imagem) {
            const reader = new FileReader();
            reader.onloadend = function () {
                produtos[produtoIndex].imagem = reader.result;
                localStorage.setItem('produtos', JSON.stringify(produtos));
                alert('Produto editado com sucesso!');
                listarProdutos();
            };
            reader.readAsDataURL(imagem);
        } else {
            localStorage.setItem('produtos', JSON.stringify(produtos));
            alert('Produto editado com sucesso!');
            listarProdutos();
        }
    }

    // Função para excluir um produto
    function excluirProduto(event) {
        event.preventDefault();

        // Obtém o nome do produto inserido no campo de texto
        const nome = document.getElementById('idProdutoExcluir').value.trim().toLowerCase();
        if (nome === '') {
            alert('Por favor, insira o nome do produto.');
            return;
        }

        // Encontra o índice do produto pelo nome
        const produtoIndex = produtos.findIndex(produto => produto.nome.toLowerCase() === nome);

        if (produtoIndex === -1) {
            alert('Produto não encontrado!');
            return;
        }

        // Remove o produto do array
        produtos.splice(produtoIndex, 1);

        // Atualiza o localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));

        alert('Produto excluído com sucesso!');

        // Limpa o campo de entrada
        document.getElementById('idProdutoExcluir').value = '';

        // Atualiza a lista de produtos
        listarProdutos();
    }

    // Chama a função de listar produtos ao carregar a página
    listarProdutos();

    // Adiciona os eventos de submit para cadastro, edição e exclusão de produto
    document.getElementById('cadastroProduto').addEventListener('submit', cadastrarProduto);
    document.getElementById('editarProduto').addEventListener('submit', editarProduto);
    document.getElementById('excluirProduto').addEventListener('submit', excluirProduto);
});






