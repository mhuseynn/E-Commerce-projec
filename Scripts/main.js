
const menuBtn = document.getElementById('menuBtn');
const menuDiv = document.getElementById('menuDiv');
const categoryTags = document.getElementsByClassName("category")
const categoryName = document.getElementById("categoryName")
const tagsArray = Array.from(categoryTags);
let products;

//Category ler
tagsArray.forEach(element => {
    element.addEventListener("click", (event) => {
        event.preventDefault();
        tagsArray.forEach(el => {
            el.style.color = "black"
            el.style.borderBottom = "none";
        });
        element.style.color = "green";
        element.style.borderBottom = "2px solid green";
        categoryName.innerText = element.innerText;
    })

});


menuBtn.addEventListener('click', function () {
    menuDiv.classList.toggle('hidden');
});


//Product larin fetch i 
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        products = responseData.product;

        const container = document.getElementById('product-card-container');
        console.log(products);

        if (Array.isArray(products)) {
            products.forEach(product => {
                createProductCard(container, product);
            });
        } else {
            throw new Error('Unexpected products data format');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        const container = document.getElementById('product-card-container');
        if (container) {
            container.innerHTML = '<p class="text-red-500">Failed to load products.</p>';
        }
    }
});

//Her bir product ucun card 
function createProductCard(container, product) {

    const productCard = document.createElement('div');
    productCard.className = 'max-w-sm rounded overflow-hidden shadow-lg m-4 sm:h-[444px] sm:w-[386px] p-[16px]';
    productCard.setAttribute("id", product.id);

    productCard.innerHTML = `
    <div class="relative">
    <img class="mb-[10px] h-[330px] w-[354px] object-contain" src="${product.gallery[0]}" alt="${product.title}">
    <button class="add-to-cart-btn bg-green-500 rounded-[100%] text-white px-4 py-2 w-[52px] h-[52px] rounded absolute bottom-2 right-2">
            <img class="w-5 h-5" src="./Assets/cartwhite.svg" alt="">
    </button>
</div>
<div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">${product.title}</div>
    <p class="text-gray-900 font-bold text-xl">$${product.price}</p>
</div>
    `;
    
    productCard.addEventListener('click', () => {
        console.log("salam");
        products.forEach(p => {
            if (p.id == productCard.id) {
                localStorage.setItem('selectedProduct', JSON.stringify(p));
                window.location.href = "product.html";
            }
        });
    });

    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        addToCart(product);
    });
    
    container.appendChild(productCard);
}


const cartbtn=document.getElementById("cartbtn");

cartbtn.addEventListener("click",()=>{
    console.log("sa");
    window.location.href="cart.html";
});


function addToCart(product) {
    
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    selectedProducts.push(product); 
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    alert("added to cart");
}

