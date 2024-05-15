document.getElementById('getProducts').addEventListener('click', async () => {
    const response = await fetch('/api/produtos');
    const products = await response.json();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.nome;
        li.classList.add('list-group-item');
        productList.appendChild(li);
    });
});