document.getElementById('getProducts').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3001/api/produtos');
    const products = await response.json();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = product.nome;
        tr.appendChild(td);
        productList.appendChild(tr);
    });
});
