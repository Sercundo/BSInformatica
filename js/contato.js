document.getElementById('Contato').addEventListener('input', function(event) {
    const conato = event.target.value
  
    if (contato.length === 8) {
      getAddress();
    }
  });
  
  // Função para buscar o endereço com base no CEP digitado
  function getAddress() {
    const cep = document.getElementById('cep')
  
    fetch(`https://viacep.com.br/ws/${contato}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }
        document.getElementById('Nome').value = data.nome;
        document.getElementById('Email').value = data.email;
        document.getElementById('telefone').value = data.telefone;
        document.getElementById('Mensagem').value = data.mensagem;
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar o CEP:', error);
      });
  }