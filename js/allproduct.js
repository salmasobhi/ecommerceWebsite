const itemsSale = document.getElementById('item-sale');
const itemOfProduct=document.querySelector('.itemOfProduct');
const itemWomen = document.getElementById('womenCategory');
const itemKids = document.getElementById('KidsclothesCategory');
const itemShoes = document.getElementById('shosesCategory');
const itemJewelry = document.getElementById('JewelryCategory'); 
const sectionWomen=document.getElementById("sectionWomen")
const sectionKids=document.getElementById("sectionKids")
const sectionShoes=document.getElementById("sectionShoes")
const sectionJewelry=document.getElementById("sectionJewelry")
const ALLPRODUCTS=document.getElementById("ALLPRODUCTS")
const hint=document.getElementById("hint")
//////////////////////////////sale///////////////////////////////////////
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
    data.forEach(product => {
        if (product.old_price) {
            const isInCart=cart.some(item => item.id == product.id);
            const discountPresent =Math.floor((product.old_price - product.price) / product.old_price * 100);
            itemsSale.innerHTML+=`
          <div class="product">
          <span class="sale-present">${discountPresent}%</span>
          <div class="imgproduct">
              <a href="#"><img src="${product.img}" alt=""></a>
          </div>
          <p class="proname">
              <a href="#">${product.name}
              </a>
          </p>
          <div class="price">
              <p><span>$${product.price}</span></p>
              <p class="oldprice">$${product.old_price}</p>
          </div>
          <div class="icon">
               <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                  ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
               </span>
                <span class="iconpro" data-item-id="${product.id}">
                        <i class="fa-solid fa-eye"></i>
               </span>
          </div>
     </div>`
      }
      });
//         itemOfProduct.innerHTML=" "
//        data.forEach(product => {
//         const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
//         if (product.category === "Jewelry") {
//             const isInCart=cart.some(item => item.id == product.id);
//           const discountClothes = product.old_price ? `<p class="oldprice">$${product.old_price}</p>` : " ";
//           const discountClothesPresent = product.old_price ? `<span class="sale-present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : " ";
  
//           itemOfProduct.innerHTML+=`
//           <div class="product">
//           ${discountClothesPresent} 
//           <div class="imgproduct">
//               <a href="#"><img src="${product.img}" alt=""></a>
//           </div>
//           <p class="proname">
//               <a href="#">${product.name}
//               </a>
//           </p>
//            <div class="price">
//                 <p><span>$${product.price}</span></p>
//                 ${discountClothes}
//             </div>
//           <div class="icon">
//                <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
//                   ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
//                </span>
//                 <span class="iconpro" data-item-id="${product.id}">
//                         <i class="fa-solid fa-eye"></i>
//                </span>
//           </div>
//      </div>`
//         }
//        })
//   });
ICONPROACTION()
HandleAddToCart()
})
/////////////////////////////////////women//////////////////////////////////////////////////
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    sectionWomen.addEventListener('click', function() {
      itemOfProduct.innerHTML = ""; 
      data.forEach(product => {
        if (product.category === "women cloths") {
          const isInCart = cart.some(item => item.id == product.id);
          const discountClothes = product.old_price ? `<p class="oldprice">$${product.old_price}</p>` : " ";
          const discountClothesPresent = product.old_price ? `<span class="sale-present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : " ";
          hint.innerHTML=`<i class="fa-solid fa-tags"></i>women cloths</h2>`
          itemOfProduct.innerHTML += `
            <div class="product">
              ${discountClothesPresent} 
              <div class="imgproduct">
                <a href="#"><img src="${product.img}" alt=""></a>
              </div>
              <p class="proname">
                <a href="#">${product.name}</a>
              </p>
              <div class="price">
                <p><span>$${product.price}</span></p>
                ${discountClothes}
              </div>
              <div class="icon">
                <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                  ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
                </span>
                <span class="iconpro" data-item-id="${product.id}">
                  <i class="fa-solid fa-eye"></i>
                </span>
              </div>
            </div>
          `;
        }
      });

      ICONPROACTION()
      HandleAddToCart()
    });
  });
//////////////////////////////////////////////Kids/////////////////////////////////////////////////
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
      sectionKids.addEventListener('click',function(){
        itemOfProduct.innerHTML=" "
    data.forEach(product => {
        const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
        if (product.category === "kids") {
            const isInCart=cart.some(item => item.id == product.id);
          const discountClothes = product.old_price ? `<p class="oldprice">$${product.old_price}</p>` : " ";
          const discountClothesPresent = product.old_price ? `<span class="sale-present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : " ";
            hint.innerHTML=`<i class="fa-solid fa-tags"></i>kids</h2>`
          itemOfProduct.innerHTML+=`
          <div class="product">
          ${discountClothesPresent} 
          <div class="imgproduct">
              <a href="#"><img src="${product.img}" alt=""></a>
          </div>
          <p class="proname">
              <a href="#">${product.name}
              </a>
          </p>
           <div class="price">
                <p><span>$${product.price}</span></p>
                ${discountClothes}
            </div>
          <div class="icon">
               <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                  ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
               </span>
                <span class="iconpro" data-item-id="${product.id}">
                        <i class="fa-solid fa-eye"></i>
               </span>
          </div>
     </div>`
        }
      });
      ICONPROACTION()
      HandleAddToCart()
    })

})
/////////////////////////////////////////shose/////////////////////////////////////////////////////////

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]

    sectionShoes.addEventListener('click',function(){
        itemOfProduct.innerHTML=" "
     data.forEach(product => {
        const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
        if (product.category === "shose") {
            const isInCart=cart.some(item => item.id == product.id);
          const discountClothes = product.old_price ? `<p class="oldprice">$${product.old_price}</p>` : " ";
          const discountClothesPresent = product.old_price ? `<span class="sale-present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : " ";
           hint.innerHTML=`<i class="fa-solid fa-tags"></i>shoses</h2>`
          itemOfProduct.innerHTML+=`
          <div class="product">
          ${discountClothesPresent} 
          <div class="imgproduct">
              <a href="#"><img src="${product.img}" alt=""></a>
          </div>
          <p class="proname">
              <a href="#">${product.name}
              </a>
          </p>
           <div class="price">
                <p><span>$${product.price}</span></p>
                ${discountClothes}
            </div>
          <div class="icon">
               <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                  ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
               </span>
                <span class="iconpro" data-item-id="${product.id}">
                        <i class="fa-solid fa-eye"></i>
               </span>

          </div>
     </div>`
        }
       });
       ICONPROACTION()
       HandleAddToCart()
    })

})
/////////////////////////////////////JUwlery/////////////////////////////////////////////////
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
    sectionJewelry.addEventListener('click',function(){
        itemOfProduct.innerHTML=" "
       data.forEach(product => {
        const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
        if (product.category === "Jewelry") {
            const isInCart=cart.some(item => item.id == product.id);
          const discountClothes = product.old_price ? `<p class="oldprice">$${product.old_price}</p>` : " ";
          const discountClothesPresent = product.old_price ? `<span class="sale-present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : " ";
          hint.innerHTML=`<i class="fa-solid fa-tags"></i>Jewelry</h2>`
          itemOfProduct.innerHTML+=`
          <div class="product">
          ${discountClothesPresent} 
          <div class="imgproduct">
              <a href="#"><img src="${product.img}" alt=""></a>
          </div>
          <p class="proname">
              <a href="#">${product.name}
              </a>
          </p>
           <div class="price">
                <p><span>$${product.price}</span></p>
                ${discountClothes}
            </div>
          <div class="icon">
               <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                  ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
               </span>
                <span class="iconpro" data-item-id="${product.id}">
                        <i class="fa-solid fa-eye"></i>
               </span>
          </div>
     </div>`
        }
       })
       ICONPROACTION()
       HandleAddToCart()
  });
})
///////////////////////////////FUNICONPTO//////////////////////////////////////////////////////////////////
function ICONPROACTION() {
  const btnAddCart = document.querySelectorAll(".iconpro");
  btnAddCart.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = button.getAttribute('data-item-id');
      localStorage.setItem('selectedProductId', productId);
      window.location.href = "../html/item.html";
    });
  });
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const cart =JSON.parse(localStorage.getItem('cartItems')) ||[]
    ALLPRODUCTS.addEventListener('click',function(){
        itemOfProduct.innerHTML=" "
       data.forEach(product => {
      
          const isInCart=cart.some(item => item.id == product.id);
          const discountClothes = product.old_price ? `<p class="oldprice">$${product.old_price}</p>` : " ";
          const discountClothesPresent = product.old_price ? `<span class="sale-present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : " ";
          hint.innerHTML=`<i class="fa-solid fa-tags"></i>Our Products`
          itemOfProduct.innerHTML+=`
          <div class="product">
          ${discountClothesPresent} 
          <div class="imgproduct">
              <a href="#"><img src="../${product.img}" alt=""></a>
          </div>
          <p class="proname">
              <a href="#">${product.name}
              </a>
          </p>
           <div class="price">
                <p><span>$${product.price}</span></p>
                ${discountClothes}
            </div>
          <div class="icon">
               <span class="btn-addcart ${isInCart ? 'active' : ""} buttonCart" data-id=${product.id}>
                  ${isInCart ? `<i class="fa-solid fa-cart-arrow-down"></i>` : `<i class="fa-solid fa-cart-plus"></i>`} 
               </span>
                <span class="iconpro" data-item-id="${product.id}">
                        <i class="fa-solid fa-eye"></i>
               </span>
          </div>
         </div>`
        
       })
       ICONPROACTION()
       HandleAddToCart()
  });
})
