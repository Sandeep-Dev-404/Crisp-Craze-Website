let cart = [];
let total = 0;

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
        total += price;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
        total += price;
    }
    updateCart();
    animateCart();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
li.innerHTML = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} <button onclick="removeFromCart(${index})" class="remove-button">Remove</button>`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function placeOrder() {
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const button = document.getElementById('order-button');
    const spinner = document.getElementById('spinner');

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    if (!name || !email) {
        alert('Please fill in your name and email.');
        return;
    }

    button.style.display = 'none';
    spinner.style.display = 'block';
    setTimeout(() => {
        alert(`Order placed successfully, ${name}! Total: $${total.toFixed(2)}. A confirmation will be sent to ${email}.`);
        cart = [];
        total = 0;
        document.getElementById('order-form').reset();
        updateCart();
        button.style.display = 'block';
        spinner.style.display = 'none';
    }, 1000);
}