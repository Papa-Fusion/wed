

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let cartTotal = 0;

    // Seleccionar los elementos de la página
    const cartContainer = document.querySelector('.cart-items-container');
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartIcon = document.querySelector('#cart-btn');
    const cartTotalElement = document.createElement('div');
    cartTotalElement.classList.add('cart-total');
    cartContainer.appendChild(cartTotalElement);

    // Función para actualizar la visualización del carrito
    function updateCart() {
        cartContainer.innerHTML = ''; // Limpiar el carrito antes de actualizar

        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <span class="fas fa-times" data-index="${index}"></span>
                    <img src="${item.image}" alt="">
                    <div class="content">
                        <h3>${item.name}</h3>
                        <div class="price">${item.price}</div>
                    </div>
                </div>
            `;
        });

        // Agregar funcionalidad para eliminar productos del carrito
        const deleteButtons = cartContainer.querySelectorAll('.fa-times');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const itemPrice = parseFloat(cart[index].price.replace('$', ''));
                cart.splice(index, 1); // Eliminar el producto del array
                cartTotal -= itemPrice; // Restar el precio del total
                updateCart(); // Actualizar la visualización del carrito
                updateCartTotal(); // Actualizar el total del carrito
            });
        });

        // Hacer scroll automático al agregar nuevos productos
        cartContainer.scrollTop = cartContainer.scrollHeight;
    }

    // Función para actualizar el total del carrito
    function updateCartTotal() {
        if (cartTotal > 0) {
            cartTotalElement.innerHTML = `<h3>Total: $${cartTotal.toFixed(2)}</h3>`;
        } else {
            cartTotalElement.innerHTML = '';
        }
    }

    // Función para agregar productos al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.box');
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText.split(' ')[0].replace('$', ''));
            const productImage = product.querySelector('img').src;

            const cartItem = {
                name: productName,
                price: `$${productPrice.toFixed(2)}`,
                image: productImage
            };

            cart.push(cartItem);
            cartTotal += productPrice; // Añadir el precio al total
            updateCart();
            updateCartTotal();
        });
    });

    // Mostrar el carrito al hacer clic en el ícono del carrito
    cartIcon.addEventListener('click', () => {
        cartContainer.classList.toggle('active');
    });

    // Menu button toggle
    let menuBtn = document.querySelector('#menu-btn');
    let navbar = document.querySelector('.header .navbar');

    menuBtn.onclick = () => {
        navbar.classList.toggle('active');
    };

    // Search button toggle
    let searchForm = document.querySelector('.search-form');
    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        navbar.classList.remove('active');
        cartContainer.classList.remove('active');
    };

    // Hide search and cart on scroll
    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartContainer.classList.remove('active');
    };
});
