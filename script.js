let cart = [];
let total = 0;

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

const sidebar = document.getElementById("cart-sidebar");
const cartIcon = document.getElementById("cart-icon");
const closeCart = document.getElementById("close-cart");

// Open Cart
cartIcon.addEventListener("click", () => {
    sidebar.classList.add("active");
});

// Close Cart
closeCart.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

// Add to Cart
document.querySelectorAll(".card button").forEach(button => {

    button.addEventListener("click", function(){

        const card = this.parentElement;

        const name = card.querySelector("h3").innerText;

        const price = parseInt(
            card.querySelector("p").innerText.replace("₹","")
        );

        cart.push({name, price});

        updateCart();

    });

});

// Search
const search = document.getElementById("search");

search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

        const product = card.querySelector("h3").innerText.toLowerCase();

        if(product.includes(value)){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }

    });

});

// Hamburger Menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Update Cart
function updateCart(){

    cartItems.innerHTML = "";

    total = 0;

    cart.forEach((item,index)=>{

        total += item.price;

        cartItems.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <button onclick="removeItem(${index})">X</button>
        </div>
        `;

    });

    cartCount.innerText = cart.length;
    totalPrice.innerText = total;

}

// Remove Item
function removeItem(index){

    cart.splice(index,1);

    updateCart();

}
// Product Filter

const filterButtons = document.querySelectorAll(".filter-btn");

const products = document.querySelectorAll(".product-grid .card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        products.forEach(product => {

            if(filter === "all" || product.dataset.category === filter){
                product.style.display = "block";
            }else{
                product.style.display = "none";
            }

        });

    });

});
// Wishlist

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if(button.classList.contains("fa-regular")){
            button.classList.remove("fa-regular");
            button.classList.add("fa-solid");
        }else{
            button.classList.remove("fa-solid");
            button.classList.add("fa-regular");
        }

    });

});
// Back to Top Button

const topBtn = document.getElementById("topBtn");

// Show button when scrolling
window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }

});

// Scroll to top
topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});
// Dark Mode

const darkMode = document.getElementById("dark-mode");

darkMode.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        darkMode.classList.remove("fa-moon");
        darkMode.classList.add("fa-sun");
    }else{
        darkMode.classList.remove("fa-sun");
        darkMode.classList.add("fa-moon");
    }

});
// Checkout

const checkoutBtn = document.getElementById("checkout");

checkoutBtn.addEventListener("click", () => {

    if(cart.length === 0){

        alert("Your cart is empty!");

    }else{

        alert("🎉 Thank you for shopping with StyleHub!");

        cart = [];

        updateCart();

        sidebar.classList.remove("active");

    }

});