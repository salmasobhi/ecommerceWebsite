// Open&Close cart
var cart_Info = document.querySelector(".cartInfo");
var cartIcon = document.querySelector(".cart");
var close_cart = document.querySelector(".close-cart");
const transbg= document.querySelector(".trans-bg");
function openCart() {
    cart_Info.classList.add("active");
}

function closeCart() {
    cart_Info.classList.remove("active"); 
}
cartIcon.addEventListener('click', openCart); 
close_cart.addEventListener('click', closeCart);
transbg.addEventListener('click', closeCart);

//slider
var images=document.querySelector("#img")
var next =document.querySelector(".swiper-button-next")
var prev=document.querySelector(".swiper-button-prev")
var arrImage=[];
arrImage[0]="image/2.jpg"
arrImage[1]="image/3.jpg"
arrImage[2]="image/4.jpg"
arrImage[3]="image/6.jpg"
let currentSrc=0;
function nextImage()
{
   currentSrc++
   if(currentSrc>3)
    currentSrc=0
   images.src=arrImage[currentSrc];
}
function prevImage()
{
   currentSrc--
   if(currentSrc<0)
    currentSrc=0
   images.src=arrImage[currentSrc];
}
prev.addEventListener('click',prevImage)
next.addEventListener('click',nextImage)

////////////sliderPRO//////////
const productContainers = document.querySelector('#item-sale');
const nxtBtn = document.querySelector('.next-btn');
const preBtn = document.querySelector('.prev-btn');

if (productContainers && nxtBtn && preBtn) {
    productContainers.style.display = 'flex';
    productContainers.style.overflow = 'hidden';
    productContainers.style.scrollBehavior = 'smooth';

    nxtBtn.addEventListener('click', () => {
        productContainers.scrollLeft += 300;
        if (productContainers.scrollLeft + productContainers.clientWidth >= productContainers.scrollWidth) {
            productContainers.scrollLeft = 0;
        }
    });

    preBtn.addEventListener('click', () => {
        productContainers.scrollLeft -= 300;
        if (productContainers.scrollLeft <= 0) {
            productContainers.scrollLeft = productContainers.scrollWidth - productContainers.clientWidth;
        }
    });

    let autoScroll = setInterval(() => {
        productContainers.scrollLeft += 300;
        if (productContainers.scrollLeft + productContainers.clientWidth >= productContainers.scrollWidth) {
            productContainers.scrollLeft = 0;
        }
    }, 3000);

    productContainers.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    productContainers.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            productContainers.scrollLeft += 300;
            if (productContainers.scrollLeft + productContainers.clientWidth >= productContainers.scrollWidth) {
                productContainers.scrollLeft = 0;
            }
        }, 3000);
    });
}

// حذف الكود المكرر التالي
// const productContainers = document.querySelectorAll('.products');
// const nxtBtn = document.querySelectorAll('.next');
// const preBtn = document.querySelectorAll('.prev');

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth / 2; // Scroll half container width for smoother transition
        if (item.scrollLeft + containerWidth >= item.scrollWidth) {
            item.scrollLeft = 0; // Reset to start if reached end
        }
    });

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth / 2;
        if (item.scrollLeft <= 0) {
            item.scrollLeft = item.scrollWidth - containerWidth; // Go to end if at start
        }
    });

    // Add smooth scrolling behavior
    item.style.scrollBehavior = 'smooth';
    
    // Optional: Auto scroll
    let autoScroll = setInterval(() => {
        item.scrollLeft += containerWidth / 2;
        if (item.scrollLeft + containerWidth >= item.scrollWidth) {
            item.scrollLeft = 0;
        }
    }, 5000); // Auto scroll every 5 seconds

    // Pause auto scroll on hover
    item.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    item.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            item.scrollLeft += containerWidth / 2;
            if (item.scrollLeft + containerWidth >= item.scrollWidth) {
                item.scrollLeft = 0;
            }
        }, 5000);
    });
});
////////////////////add to cart////////////////////////////////////////////
function HandleAddToCart(){
fetch('products.json')
  .then(response => response.json())
  .then(data => {
     const btnAddCart = document.querySelectorAll(".buttonCart");
      btnAddCart.forEach(button => {
      button.addEventListener('click', (event) => {
        console.log(event.target);
      const productId=event.target.getAttribute('data-id');
      console.log(productId);
      const selectProduct=data.find(product => product.id == productId );
      addToCart(selectProduct);
      const allSameBtn = document.querySelectorAll(`.buttonCart[data-id="${productId}"]`);
      allSameBtn.forEach(btn => {
        btn.classList.add("active")
        btn.innerHTML=`<i class="fa-solid fa-cart-arrow-down"></i>`
      })
      });
    })
  });
function addToCart(product) {
  let cartItems =  JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({...product, quantity:1});
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
};

 function updateCart() {
    const cartItems=document.getElementById("cart-items");
    const  cart =JSON.parse(localStorage.getItem('cartItems')) || [];
    var countItemTotal=0; 
    var totalPriceAll=0;// side aheader of cart

  
    cartItems.innerHTML="";
    cart.forEach((item,i) => {
        let totalPrice =  item.price * item.quantity;
        totalPriceAll+=totalPrice;  
        countItemTotal+=item.quantity;
        cartItems.innerHTML+=`
                <div class="pro-cart">
                <img src="${item.img}" alt="">
                <div class="contant">
                    <h5>${item.name}</h5>
                    <p class="price-cart">${totalPrice}</p>
                    <div class="quantityControl">
                        <button class="decreaseQuantity" data-index="${i}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increaseQuantity"  data-index="${i}">+</button>
                    </div>
                </div>
                <button class="delete-item" data-index="${i}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `  
    })
    /////////////////////////////////incart+-///////////////////////////////////////////////////////
    const decreaseQuantity=document.querySelectorAll(".decreaseQuantity");
    const increaseQuantity=document.querySelectorAll(".increaseQuantity");
    decreaseQuantity.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const itemIndex=event.target.getAttribute("data-index");
            decreaseItem(itemIndex);
        })
    })
    increaseQuantity.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const itemIndex=event.target.getAttribute("data-index");
            increaseItem(itemIndex);    
        })
    })
    ////////////////////////////////number in cart////////////////////////////////////////////////
    const countItemHeader=document.querySelector(".count-item");
    const cartItemsincart=document.querySelector(".cart-countincart");
    const pricecartInNav=document.querySelector(".price-cart");
    const priceCartTotal=document.querySelector(".price-cart-total");
    priceCartTotal.innerHTML=`$${totalPriceAll}`;
    pricecartInNav.innerHTML=`$${totalPriceAll}`;
    cartItemsincart.innerHTML=countItemTotal;
    countItemHeader.innerHTML=countItemTotal;

    ////////////////////////////////////////////////////////////////////////////////////////
    const deleteItem = document.querySelectorAll(".delete-item");
    deleteItem.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const itemIndex=event.target.closest('button').getAttribute("data-index");
            removeItem(itemIndex);
        })
    })
}
function increaseItem(index){
    const  cart =  JSON.parse(localStorage.getItem('cartItems')) || [];
    cart[index].quantity++;
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCart();
}
function decreaseItem(index){
    const  cart =  JSON.parse(localStorage.getItem('cartItems')) || [];
    if(cart[index].quantity>1){
        cart[index].quantity--;
        localStorage.setItem('cartItems', JSON.stringify(cart));
        updateCart();
    }
}

//////////////////////////////////////////////////////////////////////////
function removeItem(index){
    const  cart =  JSON.parse(localStorage.getItem('cartItems')) || [];
    const removeproduct= cart.splice(index, 1)[0];
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCart();
    updateCartIcon(removeproduct.id);
}
function updateCartIcon(productId){
    const sameBtn = document.querySelectorAll(`.buttonCart[data-id="${productId}"]`);
    sameBtn.forEach(btn => {
        btn.classList.remove("active")
        btn.innerHTML=`<i class="fa-solid fa-cart-plus"></i>`
    })
}
updateCart()
}
////////////////Fotter///////////////////////
const scrollTopButton = document.getElementById("scrollTopButton");

scrollTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
/////////////////////item details /////////////////////////////////////////
document.querySelectorAll('.iconpro').forEach(  eyeIcon=> {
  eyeIcon.addEventListener('click', function() {
      const productId = this.getAttribute('data-item-id');  
      window.location.href = `item.html?id=${productId}`; 
  });
});
//////////////////////////////process check out/////////////////////////////////////////////
const checkOutBtn = document.getElementById("checkout");
const cartItems=document.getElementById("cart-items");
checkOutBtn.addEventListener('click', function() {
    cartItems.innerHTML="";
    localStorage.removeItem('cartItems'); 
});
/////////////////////////////Login///////////////////////////////////////////////////////
// Login/Logout visibility control
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const username = localStorage.getItem('username');

if (username) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
} else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
}

// Add logout functionality
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    window.location.reload();
});
if (username) {
    document.getElementById('greeting').textContent = `Hello, ${username}.`;
} else {
    document.getElementById('greeting').textContent = "Hello, guest! Please log in.";
}
////////////////////////////////////////////////////////////////////////////////
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const btnAddCart = document.querySelectorAll(".iconpro");
    btnAddCart.forEach(button => {
      button.addEventListener('click', (event) => {
        const productId = button.getAttribute('data-item-id');
        localStorage.setItem('selectedProductId', productId);
        window.location.href = "../html/item.html";
      });
    });
      })
  