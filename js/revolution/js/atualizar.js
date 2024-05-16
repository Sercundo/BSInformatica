document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = document.getElementById('id').value;
            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const codigo = document.getElementById('codigo').value;
            const cor = document.getElementById('cor').value;
            const response = await fetch(`http://localhost:3001/api/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao, codigo, cor }),
            });
            if (response.ok) {
                alert('Produto atualizado com sucesso.');
            } else {
                alert('Erro ao atualizar o produto.');
            }
});