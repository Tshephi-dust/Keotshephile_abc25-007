let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// 🛒 ADD TO CART
// ==========================
function addToCart(name, price, button = null) {

    let item = cart.find(p => p.name === name);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    // UI feedback
    if (button) {
        button.textContent = "Added ✔";
        button.disabled = true;

        setTimeout(() => {
            button.textContent = "Add to Cart";
            button.disabled = false;
        }, 1200);
    }
}

// ==========================
// 💾 SAVE CART
// ==========================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// 🛒 UPDATE CART COUNT
// ==========================
function updateCartCount() {
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    let el = document.getElementById("cart-count");
    if (el) el.innerText = totalItems;
}

// ==========================
// 📦 LOAD CART PAGE
// ==========================
function loadCartPage() {
    let list = document.getElementById("cart-list");
    let totalEl = document.getElementById("cart-total");

    if (!list) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        let div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>P${item.price} × ${item.quantity}</p>
            </div>

            <div>
                <button onclick="decreaseQty(${index})">➖</button>
                <button onclick="increaseQty(${index})">➕</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        list.appendChild(div);
    });

    totalEl.innerText = total;
    saveCart();
    updateCartCount();
}

// ==========================
// ➕ INCREASE QTY
// ==========================
function increaseQty(index) {
    cart[index].quantity++;
    loadCartPage();
}

// ==========================
// ➖ DECREASE QTY
// ==========================
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    loadCartPage();
}

// ==========================
// ❌ REMOVE ITEM
// ==========================
function removeItem(index) {
    cart.splice(index, 1);
    loadCartPage();
}

// ==========================
// 🧹 CLEAR CART
// ==========================
function clearCart() {
    cart = [];
    saveCart();
    loadCartPage();
}

// ==========================
// 📤 SUBMIT ORDER
// ==========================
function submitOrder(event) {
    event.preventDefault();

    alert("🎉 Order placed successfully!");

    cart = [];
    saveCart();

    window.location.href = "index.html";
}

// ==========================
// 🚀 INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    loadCartPage();
    updateCartCount();
});
