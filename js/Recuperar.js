document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Para prevenir o envio do formulário

    var email = document.getElementById('email').value;

    fetch('#COLOCAR A API AQUI', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
