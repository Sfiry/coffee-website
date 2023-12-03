let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');
let addToCartButtons = document.querySelectorAll('.addToCartBtn');
let cartItems = document.querySelector('.cart-items-container .cart-items');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

document.querySelectorAll('.removeCartItem').forEach(button => {
    button.addEventListener('click', removeCartItem);
});

function addToCart(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    let button = event.target;
    let box = button.closest('.box');
    let id = box.getAttribute('data-id');
    let title = box.querySelector('h3').innerText;
    let price = box.querySelector('.price').innerText;

    let cartItemHTML = `
        <div class="cart-item" data-id="${id}">
            <span class="fas fa-times removeCartItem"></span>
            <img src="images/menu-${id}.png" alt="">
            <div class="content">
                <h3>${title}</h3>
                <div class="price">${price}</div>
            </div>
        </div>
    `;

    cartItems.insertAdjacentHTML('beforeend', cartItemHTML);

    // Atualize esta função para calcular o preço total do carrinho
    updateCartTotal();
    updateCartCount();

    // Armazene os itens do carrinho em localStorage
    storeCartItems();

    // Torne o carrinho visível quando um item é adicionado
    cartItem.classList.add('active');
}

function storeCartItems() {
    let cartItems = document.querySelectorAll('.cart-item');
    let cartItemsArray = [];

    cartItems.forEach(cartItem => {
        let id = cartItem.getAttribute('data-id');
        let title = cartItem.querySelector('.content h3').innerText;
        let price = cartItem.querySelector('.content .price').innerText;

        cartItemsArray.push({
            id: id,
            title: title,
            price: price
        });
    });

    // Armazene os itens do carrinho em localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
}

function removeCartItem(event) {
    let button = event.target;
    let cartItem = button.closest('.cart-item');

    if (cartItem) {
        let id = cartItem.getAttribute('data-id');

        // Remova o item do carrinho com o ID correspondente
        cartItem.remove();

        // Atualize a contagem do carrinho
        updateCartCount();

        // Verifique se há itens no carrinho e torne-o visível ou invisível conforme necessário
        if (cartItems.children.length === 0) {
            cartItem.classList.remove('active');
        }

        // Atualize o preço total do carrinho após a remoção do item
        updateCartTotal();
    }
}

function updateCartTotal() {
    let cartItems = document.querySelectorAll('.cart-item');
    let total = 0;

    cartItems.forEach(cartItem => {
        let priceText = cartItem.querySelector('.price').innerText;
        let price = parseFloat(priceText.replace('$', '').replace('/-', '').trim());
        total += price;
    });

    // Atualize o preço total no carrinho
    document.querySelector('.cart-items-container .total').innerText = `$${total.toFixed(2)}/-`;
}

function updateCartCount() {
    // Atualize a contagem do carrinho ou faça outras ações necessárias.
}

// Adicione um ouvinte de eventos para os botões de remoção de item
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('removeCartItem')) {
        removeCartItem(event);
    }
});

// Ajuste a função removeCartItem
function removeCartItem(event) {
    let button = event.target;
    let cartItem = button.closest('.cart-item');

    if (cartItem) {
        let id = cartItem.getAttribute('data-id');

        // Remova o item do carrinho com o ID correspondente
        cartItem.remove();

        // Atualize a contagem do carrinho
        updateCartCount();

        // Verifique se há itens no carrinho e torne-o visível ou invisível conforme necessário
        if (cartItems.children.length === 0) {
            cartItem.classList.remove('active');
        }

        // Atualize o preço total do carrinho após a remoção do item
        updateCartTotal();
    }
}
