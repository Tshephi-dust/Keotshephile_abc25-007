/* =========================
   DUST THREADS - PRO JS
   ========================= */

/* =========================
   STORAGE HANDLER
   ========================= */
const Storage = {
  get(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/* =========================
   GLOBAL STATE
   ========================= */
let cart = Storage.get("cart");
let user = JSON.parse(localStorage.getItem("user")) || null;
let orders = Storage.get("orders");

/* =========================
   THEME SYSTEM
   ========================= */
const Theme = {
  toggle() {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode") ? "light" : "dark"
    );
    this.updateIcon();
  },

  load() {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
    }
    this.updateIcon();
  },

  updateIcon() {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    btn.innerHTML = document.body.classList.contains("light-mode")
      ? "☀️"
      : "🌙";
  }
};

/* =========================
   USER SYSTEM
   ========================= */
const Auth = {
  login() {
    const username = document.getElementById("username").value;
    if (!username) return alert("Enter your name");

    user = {
      name: username,
      role: username === "admin" ? "admin" : "customer"
    };

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "index.html";
  },

  logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  },

  show() {
    const el = document.getElementById("welcome");
    if (el && user) {
      el.innerText = `Welcome, ${user.name} 👕`;
    }
  }
};

/* =========================
   CART SYSTEM
   ========================= */
const Cart = {
  save() {
    Storage.set("cart", cart);
  },

  add(name, price, size = "M", color = "Black") {
    const existing = cart.find(
      item =>
        item.name === name &&
        item.size === size &&
        item.color === color
    );

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, size, color, qty: 1 });
    }

    this.save();
    alert("Added to cart 🛒");
  },

  remove(index) {
    cart.splice(index, 1);
    this.save();
    this.render();
  },

  increase(index) {
    cart[index].qty++;
    this.save();
    this.render();
  },

  decrease(index) {
    if (cart[index].qty > 1) {
      cart[index].qty--;
    } else {
      cart.splice(index, 1);
    }
    this.save();
    this.render();
  },

  total() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  render() {
    const container = document.getElementById("cartItems");
    if (!container) return;

    container.innerHTML = "";

    cart.forEach((item, i) => {
      container.innerHTML += `
        <div class="cart-item">
          <div>
            <b>${item.name}</b><br>
            ${item.size}, ${item.color}<br>
            Qty: ${item.qty} | P${item.price}
          </div>

          <div>
            <button onclick="Cart.increase(${i})">+</button>
            <button onclick="Cart.decrease(${i})">-</button>
            <button onclick="Cart.remove(${i})">❌</button>
          </div>
        </div>
      `;
    });

    const totalEl = document.getElementById("totalPrice");
    if (totalEl) totalEl.innerText = this.total();
  }
};

/* =========================
   CHECKOUT SYSTEM
   ========================= */
const Checkout = {
  deliveryFee() {
    const loc = document.getElementById("location");
    return loc ? parseInt(loc.value) : 0;
  },

  placeOrder() {
    if (!user) {
      alert("Login required");
      window.location.href = "login.html";
      return;
    }

    const order = {
      id: "ORD-" + Date.now(),
      user: user.name,
      items: cart,
      total: Cart.total() + this.deliveryFee(),
      status: "Processing",
      date: new Date().toLocaleString()
    };

    orders.push(order);

    Storage.set("orders", orders);
    localStorage.setItem("currentOrder", JSON.stringify(order));

    cart = [];
    Cart.save();

    window.location.href = "tracking.html";
  }
};

/* =========================
   TRACKING SYSTEM
   ========================= */
const Tracking = {
  load() {
    const order = JSON.parse(localStorage.getItem("currentOrder"));
    if (!order) return;

    document.getElementById("orderId").innerText = order.id;

    const steps = ["Processing", "Shipped", "Delivered"];
    let i = 0;

    setInterval(() => {
      if (i < steps.length) {
        document.getElementById("status").innerText = steps[i];
        i++;
      }
    }, 3000);
  }
};

/* =========================
   ADMIN DASHBOARD
   ========================= */
const Admin = {
  load() {
    const container = document.getElementById("orders");
    if (!container) return;

    container.innerHTML = "";

    orders.forEach(order => {
      container.innerHTML += `
        <div class="card">
          <b>${order.id}</b><br>
          ${order.user}<br>
          P${order.total}<br>
          ${order.status}
        </div>
      `;
    });
  }
};

/* =========================
   COLLECTION SYSTEM
   ========================= */
function viewCollection(type) {
  const container = document.getElementById("collectionItems");
  const title = document.getElementById("collectionTitle");

  if (!container) return;

  const data = {
    street: [
      { name: "Street King Tee", price: 150, img: "images/G1.jpg" },
      { name: "Urban Vibe Tee", price: 140, img: "images/G5.jpg" }
    ],
    minimal: [
      { name: "Plain White Tee", price: 100, img: "images/P4.jpg" }
    ],
    oversized: [
      { name: "Oversized Drop Tee", price: 160, img: "images/O4.jpg" }
    ],
    custom: [
      { name: "Custom Print Tee", price: 180, img: "images/G5.jpg" }
    ]
  };

  title.innerText = type.toUpperCase() + " Collection";
  container.innerHTML = "";

  data[type].forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>P${item.price}</p>
        <button class="btn" onclick="Cart.add('${item.name}', ${item.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

/* =========================
   CONTACT FORM
   ========================= */
function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Fill all fields");
    return;
  }

  alert("Message sent ✅");
}

/* =========================
   INIT
   ========================= */
function init() {
  Theme.load();
  Auth.show();
  Cart.render();
  Tracking.load();
  Admin.load();
}

init();

/* =========================
   GLOBAL ACCESS (for HTML)
   ========================= */
function toggleTheme() { Theme.toggle(); }
function login() { Auth.login(); }
function logout() { Auth.logout(); }
function goToCheckout() { window.location.href = "checkout.html"; }
function placeOrder() { Checkout.placeOrder(); }
