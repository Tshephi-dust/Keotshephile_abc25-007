function viewCollection(type) {
  let title = document.getElementById("collectionTitle");
  let container = document.getElementById("collectionItems");

  container.innerHTML = "";

  let data = {
    street: [
      { name: "Street King Tee", price: 150, img: "images/G1.jpg" },
      { name: "Urban Vibe Tee", price: 140, img: "images/G5.jpg" }
    ],

    minimal: [
      { name: "Plain White Tee", price: 100, img: "images/P4.jpg" },
      { name: "Simple Black Tee", price: 110, img: "images/P5.jpg" }
    ],

    oversized: [
      { name: "Oversized Drop Tee", price: 160, img: "images/O4.jpg" },
      { name: "Loose Fit Tee", price: 155, img: "images/O5.jpg" }
    ],

    custom: [
      { name: "Custom Print Tee", price: 180, img: "images/G5.jpg" }
    ]
  };

  title.innerText = type.toUpperCase() + " Collection";

  data[type].forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>P${item.price}</p>
        <button class="btn" onclick="addToCart('${item.name}', ${item.price}, 'M', 'Black')">
          Add to Cart
        </button>
      </div>
    `;
  });
}
