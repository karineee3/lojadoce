document.addEventListener('DOMContentLoaded', function () {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    function listarProdutos() {
        const listaDiv = document.getElementById('listaProdutos');
        listaDiv.innerHTML = '';

        if (produtos.length === 0) {
            listaDiv.innerHTML = '<p>Nenhum produto cadastrado.</p>';
            return;
        }

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

    function cadastrarProduto(event) {
        event.preventDefault();

        const nomeProduto = document.getElementById('nomeProduto').value;
        const descricaoProduto = document.getElementById('descricaoProduto').value;
        const precoProduto = document.getElementById('precoProduto').value;
        const imagemProduto = document.getElementById('imagemProduto').files[0];

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
                id: Date.now(),
                nome: nomeProduto,
                descricao: descricaoProduto,
                preco: parseFloat(precoProduto),
                imagem: reader.result,
            };

            if (produtos.some(p => p.nome === produto.nome)) {
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

    function editarProduto(event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('idProduto').value);
        const nome = document.getElementById('novoNomeProduto').value;
        const descricao = document.getElementById('novaDescricaoProduto').value;
        const preco = parseFloat(document.getElementById('novoPrecoProduto').value);
        const imagem = document.getElementById('novaImagemProduto').files[0];

        const produtoIndex = produtos.findIndex(produto => produto.id === id);
        if (produtoIndex === -1) {
            alert('Produto não encontrado!');
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

    function removerProduto(event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('idProdutoExcluir').value);
        const produtoIndex = produtos.findIndex(produto => produto.id === id);

        if (produtoIndex === -1) {
            alert('Produto não encontrado!');
            return;
        }

        produtos.splice(produtoIndex, 1);
        localStorage.setItem('produtos', JSON.stringify(produtos));

        alert('Produto excluído com sucesso!');
        document.getElementById('idProdutoExcluir').value = '';
        listarProdutos();
    }

    listarProdutos(); 

    document.getElementById('cadastroProduto').addEventListener('submit', cadastrarProduto);
});





