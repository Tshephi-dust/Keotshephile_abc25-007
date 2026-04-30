// ==========================
// 🛒 ADD TO CART (SHOP PAGE)
// ==========================
function addToCart(product, price, button) {
    
    updateCartCount();
    
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
    let existingItem = cartData.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartData.push({ product, price, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cartData));

     // 🔥 VISUAL FEEDBACK (better than alert)
    button.textContent = "Added ✔";
    button.classList.add("added");

    setTimeout(() => {
        button.textContent = "Add to Cart";
        button.classList.remove("added");
    }, 1500);

    // Update button UI
    if (button) {
        button.classList.add("added");
        button.textContent = "Added ✔";
        button.disabled = true;
    }

    alert(product + " added to cart 🛒");
}
// ==========================
// 📦 LOAD CART (CART PAGE)
// ==========================
function loadCartPage() {
    const cartList = document.getElementById("cart-list");
    const totalEl = document.getElementById("cart-total");

    if (!cartList) return;

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartList.innerHTML = "";

    let total = 0;

    cartData.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-info">
                <strong>${item.product}</strong>
                <span>P${item.price} × ${item.quantity}</span>
            </div>

            <div class="cart-actions">
                <button onclick="decreaseQty(${index})">➖</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">➕</button>
                <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
            </div>
        `;

        cartList.appendChild(div);

        total += item.price * item.quantity;
    });

    totalEl.textContent = total;
}

   
    
// ==========================
// ➕ INCREASE QUANTITY
// ==========================
function increaseQty(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    cartData[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cartData));
    loadCartPage();
}
// ==========================
// ➖ DECREASE QUANTITY
// ==========================
function decreaseQty(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartData[index].quantity > 1) {
        cartData[index].quantity -= 1;
    } else {
        cartData.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
    loadCartPage();
}
// ==========================
// ❌ REMOVE ITEM
// ==========================
function removeItem(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    if (confirm("Remove this item?")) {
        cartData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartData));
        loadCartPage();
    }
}
// ==========================
// 🧹 CLEAR CART
// ==========================
function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        localStorage.removeItem("cart");
        loadCartPage();
    }
}
// ==========================
// 📤 SUBMIT ORDER
// ==========================
function submitOrder(event) {
    event.preventDefault();

    alert("🎉 Order placed successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}
function updateCartCount() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cartData.forEach(item => {
        count += item.quantity;
    });

    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = count;
}
// ==========================
// 🚀 LOAD ON PAGE START
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    loadCartPage();
    updateCartCount();
});
function submitFeedback(event) {
  event.preventDefault(); // stop page reload

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  // Save to local storage (temporary)
  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  feedbacks.push({ name, email, message });

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  document.getElementById("successMessage").style.display = "block";

  // Clear form
  document.querySelector(".feedback-form").reset();
}
