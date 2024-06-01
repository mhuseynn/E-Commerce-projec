


//Imageler
function setProductImages(imagesDiv, product) {
    let length = product.gallery.length - 1;

    while (length >= 0) {

        const img = document.createElement("img");
        img.src = product.gallery[length];
        img.className = "w-[79px] object-container border border-gray-200";

        //Image in deyisdirilmesi
        img.addEventListener("click", () => {
            const selectedImage = document.getElementById('selectedImage');
            selectedImage.setAttribute("src", img.getAttribute('src'));
        })
        imagesDiv.appendChild(img);
        length--;
    }
}

//Sizes
function setSizes(sizesDiv, product) {
    let length = product.size.length - 1;

    while (length >= 0) {

        const div = document.createElement("div");
        div.innerText = product.size[length];
        console.log(product.size[length]);
        div.className = "flex flex-col items-center text-[16px]  py-[13px]  justify-items-center";
        div.style.border = "1px solid black";
        div.style.height = "55px";
        div.style.width = "100px";
        div.style.fontSize = '16px';
        sizesDiv.appendChild(div);
        length--;
    }
}

//Colors
function setColors(colorsDiv, product) {
    let length = product.colors.length - 1;

    while (length >= 0) {

        const divS = document.createElement("div");
        divS.style.backgroundColor = product.colors[length];
        divS.style.height = "36px";
        divS.style.width = "36px";
        colorsDiv.appendChild(divS);
        length--;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        const selectedImage = document.getElementById('selectedImage');
        selectedImage.setAttribute("src", selectedProduct.gallery[0]);
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        const price = document.getElementById("price");
        const detail = document.getElementById("detail");


        title.innerText = selectedProduct.title;
        description.innerText = selectedProduct.description;
        price.innerText = selectedProduct.price + "$";

        const imagesDiv = document.getElementById("productImages");
        const colorsDiv = document.getElementById("colors");
        const sizesDiv = document.getElementById("sizes");
        setProductImages(imagesDiv, selectedProduct);
        setColors(colorsDiv, selectedProduct);
        setSizes(sizesDiv, selectedProduct);
    }
    const addcart = document.getElementById("addcart");

    addcart.addEventListener("click", () => {
        addToCart(selectedProduct);
    })
})


function addToCart(product) {

    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    selectedProducts.push(product);
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    alert("Added to cart")
}


const btn = document.getElementById("cartbtn");

btn.addEventListener("click", () => {
    window.location.href = "cart.html";
});