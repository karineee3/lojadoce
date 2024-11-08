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
        const nomeProduto = document.getElementById('nomeProduto').value.trim();
        const descricaoProduto = document.getElementById('descricaoProduto').value.trim();
        const precoProduto = parseFloat(document.getElementById('precoProduto').value);
        const imagemProduto = document.getElementById('imagemProduto').files[0];

        if (!nomeProduto || !descricaoProduto || isNaN(precoProduto) || precoProduto <= 0 || !imagemProduto) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        if (produtos.some(p => p.nome.toLowerCase() === nomeProduto.toLowerCase())) {
            alert('Produto com esse nome já existe!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function () {
            const produto = {
                id: Date.now(),
                nome: nomeProduto,
                descricao: descricaoProduto,
                preco: precoProduto,
                imagem: reader.result,
            };

            produtos.push(produto);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            listarProdutos();
            document.getElementById('cadastroProduto').reset();
            alert('Produto cadastrado com sucesso!');
        };

        reader.readAsDataURL(imagemProduto);
    }

    function editarProduto(event) {
        event.preventDefault();
        const nomeProduto = document.getElementById('novoNomeProduto').value.trim().toLowerCase();
        const descricaoProduto = document.getElementById('novaDescricaoProduto').value.trim();
        const precoProduto = parseFloat(document.getElementById('novoPrecoProduto').value);
        const imagemProduto = document.getElementById('novaImagemProduto').files[0];

        let produtoIndex = produtos.findIndex(produto => produto.nome.toLowerCase() === nomeProduto);

        if (produtoIndex === -1) {
            alert('Produto não encontrado!');
            return;
        }

        if (descricaoProduto) produtos[produtoIndex].descricao = descricaoProduto;
        if (!isNaN(precoProduto) && precoProduto > 0) produtos[produtoIndex].preco = precoProduto;

        if (imagemProduto) {
            const reader = new FileReader();
            reader.onloadend = function () {
                produtos[produtoIndex].imagem = reader.result;
                localStorage.setItem('produtos', JSON.stringify(produtos));
                listarProdutos();
                alert('Produto editado com sucesso!');
            };
            reader.readAsDataURL(imagemProduto);
        } else {
            localStorage.setItem('produtos', JSON.stringify(produtos));
            listarProdutos();
            alert('Produto editado com sucesso!');
        }
    }

    function excluirProduto(event) {
        event.preventDefault();
        const nome = document.getElementById('idProdutoExcluir').value.trim().toLowerCase();

        const produtoIndex = produtos.findIndex(produto => produto.nome.toLowerCase() === nome);

        if (produtoIndex === -1) {
            alert('Produto não encontrado!');
            return;
        }

        produtos.splice(produtoIndex, 1);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        listarProdutos();
        alert('Produto excluído com sucesso!');
        document.getElementById('idProdutoExcluir').value = '';
    }

    listarProdutos();
    document.getElementById('cadastroProduto').addEventListener('submit', cadastrarProduto);
    document.getElementById('editarProduto').addEventListener('submit', editarProduto);
    document.getElementById('excluirProduto').addEventListener('submit', excluirProduto);
});






