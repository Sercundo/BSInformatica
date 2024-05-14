document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
// Para prevenir o envio do formulário

    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    console.log('Nome: ' + nome);
    console.log('Email: ' + email);
    console.log('Senha: ' + senha);
// Aqui você pode adicionar o código para enviar os dados para o servidor
});
