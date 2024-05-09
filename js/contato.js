function enviarDados(event) {

  event.preventDefault();
  const formulario = document.getElementById("request");

  console.log(formulario)
  const formData = new FormData(formulario);
  const jsonData = {};

  formData.forEach((value, key) => {
      jsonData[key] = value;
  });


  console.log(jsonData)

  fetch('http://localhost:8080/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao enviar dados');
      }
      return response.json();
  })
  .then(data => {
      // Aqui você pode lidar com a resposta do backend, se necessário
      console.log('Resposta do servidor:', data);
      alert(data.message)
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}


function enviarWpp() {
    const number = document.getElementById("number").value;
    const nome = document.getElementById("nome").value;
  
    
    const jsonData = {
        number,
        nome
    }

    console.log(jsonData)
  
    fetch('http://localhost:3002/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        return response.json();
    })
    .then(data => {
        // Aqui você pode lidar com a resposta do backend, se necessário
        console.log('Resposta do servidor:', data);
        alert(data.message)
    })
    .catch(error => {
        console.error('Erro:', error);
    });
  }
  

function buscarDados() {
  fetch('http://localhost:8080/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao enviar dados');
      }
      return response.json();
  })
  .then(data => {
      console.log('Resposta do servidor:', data);
      alert(data.message)
  })
  .catch(error => {
      console.error('Erro:', error);
  });
}
 