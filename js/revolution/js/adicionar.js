document.getElementById('addProductForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const codigo = document.getElementById('codigo').value;
            const cor = document.getElementById('cor').value;
            const response = await fetch('http://localhost:3001/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, descricao, codigo, cor }),
            });
            const result = await response.json();
            alert(result.mensagem);
});