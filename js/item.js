window.addEventListener('load', function() {
    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
      fetch('../products.json')
        .then(response => response.json())
        .then(data => {
            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
            const product = data.find(p => p.id == productId);
            if (product) {
              const isInCart = cart.some(item => item.id === product.id);
              const productDetailsContainer = document.querySelector('.item-detail');
              productDetailsContainer.innerHTML = `
                <div class="image">
                  <img src="../${product.img}" alt="Cloth Image">
                </div>
                <div class="details">
                  <h3>${product.name}</h3>
                  <p>Category: ${product.category}</p>
                  <p>Price: $${product.price}</p>
                  <p>Old Price: ${product.old_price ? '$' + product.old_price : 'N/A'}</p>
                  <div class="rating">
                    ${renderStars(product.rating)}
                  </div>
                  <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                    ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i> already in Cart` : `<i class="fa-solid fa-cart-plus"></i> Add to Cart`} 
                  </span>
                </div>
              `;
              
              const addToCartBtn = document.querySelector('.buttonCart');
              if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function(e) {
                  const productId = e.currentTarget.getAttribute('data-id');
                  const selectedProduct = data.find(p => p.id == productId);
                  
                  if (selectedProduct) {
                    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                    if (!cartItems.some(item => item.id == productId)) {
                      cartItems.push({...selectedProduct, quantity: 1});
                      localStorage.setItem('cartItems', JSON.stringify(cartItems));
                      
                      e.currentTarget.classList.add('active');
                      e.currentTarget.innerHTML = `<i class="fa-solid fa-cart-arrow-down"></i> In Cart`;
                      
                      if (typeof updateCart === 'function') {
                        updateCart();
                      }
                    }
                  }
                });
              }
            }
        });
    }
});

function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      // Add a filled star if the current index is less than the rating
      if (i < rating) {
        stars += '<i class="fa-solid fa-star"></i>';
      } else {
        // Add an empty star if the current index is greater than or equal to the rating
        stars += '<i class="fa-regular fa-star"></i>';
      }
    }
    return stars;
  }
/////////////////////////////login/////////////////////////////////////////////////////
const usernamek = localStorage.getItem('username');
if (usernamek) {
    document.getElementById('greeting').textContent = `Hello, ${usernamek}.`;
} else {
    document.getElementById('greeting').textContent = "Hello, guest!";
}
//////////////////////////////////////////////////////////////////////////

// Add this function after the existing code
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    var countItemTotal = 0; 
    var totalPriceAll = 0;

    // Clear existing event listeners
    const oldButtons = document.querySelectorAll('.quantityControl button, .delete-item');
    oldButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    cartItems.innerHTML = "";
    cart.forEach((item, i) => {
        let totalPrice = item.price * item.quantity;
        totalPriceAll += totalPrice;  
        countItemTotal += item.quantity;
        cartItems.innerHTML += `
            <div class="pro-cart">
                <img src="../${item.img}" alt="">
                <div class="contant">
                    <h5>${item.name}</h5>
                    <p class="price-cart">${totalPrice}</p>
                    <div class="quantityControl">
                        <button class="decreaseQuantity" data-index="${i}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increaseQuantity" data-index="${i}">+</button>
                    </div>
                </div>
                <button class="delete-item" data-index="${i}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;  
    });

    // Update cart counters and totals
    const countItemHeader = document.querySelector(".count-item");
    const cartItemsincart = document.querySelector(".cart-countincart");
    const pricecartInNav = document.querySelector(".price-cart");
    const priceCartTotal = document.querySelector(".price-cart-total");
    
    if (priceCartTotal) priceCartTotal.innerHTML = `$${totalPriceAll}`;
    if (pricecartInNav) pricecartInNav.innerHTML = `$${totalPriceAll}`;
    if (cartItemsincart) cartItemsincart.innerHTML = countItemTotal;
    if (countItemHeader) countItemHeader.innerHTML = countItemTotal;

    // Add fresh event listeners
    addCartControls();
}

function addCartControls() {
    const decreaseQuantity = document.querySelectorAll(".decreaseQuantity");
    const increaseQuantity = document.querySelectorAll(".increaseQuantity");
    const deleteItem = document.querySelectorAll(".delete-item");

    decreaseQuantity.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const itemIndex = event.target.getAttribute("data-index");
            decreaseItem(itemIndex);
        });
    });

    increaseQuantity.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const itemIndex = event.target.getAttribute("data-index");
            increaseItem(itemIndex);    
        });
    });

    deleteItem.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const itemIndex = event.target.closest('button').getAttribute("data-index");
            removeItem(itemIndex);
        });
    });
}

function increaseItem(index) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cart[index].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCart();
}

function decreaseItem(index) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    if(cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cartItems', JSON.stringify(cart));
        updateCart();
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const removeproduct = cart.splice(index, 1)[0];
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCart();
    updateCartIcon(removeproduct.id);
}

function updateCartIcon(productId) {
    const sameBtn = document.querySelectorAll(`.buttonCart[data-id="${productId}"]`);
    sameBtn.forEach(btn => {
        btn.classList.remove("active");
        btn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Add to Cart`;
    });
}

// Call updateCart when page loads
updateCart();
