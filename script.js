// Ürünleri getir
function loadProducts() {
    fetch('get_products.php')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
}

// Ürünleri göster
function displayProducts(products) {
    const productsContainer = document.querySelector('.container');
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'flower-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Satıcı: ${product.seller}</p>
            <p>Mağaza: Clara Flowers</p>
            <p>${product.description}</p>
            <span class="price">${product.price} AZN</span>
            <button onclick="orderFlower('${product.name}')">Sifariş et</button>
            ${isAdminLoggedIn ? `
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Sil</button>
            ` : ''}
        `;
        productsContainer.appendChild(card);
    });
}

// Admin girişi
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'gunel' && password === '1234') {
        isAdminLoggedIn = true;
        document.getElementById('panel-content').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
    } else {
        alert('Yanlış istifadəçi adı və ya şifrə!');
    }
});