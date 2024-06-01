

//Size lari goturub ekrana cixardir
function setSizes(sizediv, product) {
    let length = product.size.length - 1;
    while (length >= 0) {

        const div = document.createElement("div");
        div.innerText = product.size[length];
        div.className = "flex flex-col items-center text-[16px]  py-[13px]  justify-items-center";
        div.style.border = "1px solid black";
        div.style.height = "55px";
        div.style.width = "100px";
        div.style.fontSize = '16px';
        sizediv.appendChild(div);
        length--;
    }
}

//Color lari goturub ekrana cixardir
function setColors(colorDiv, product) {
    let length = product.colors.length - 1;

    while (length >= 0) {

        const divS = document.createElement("div");
        divS.style.backgroundColor = product.colors[length];
        divS.style.height = "36px";
        divS.style.width = "36px";
        colorDiv.appendChild(divS);
        length--;
    }

}

//Product arrayda eyni productu iki defe elave etdikde birini saxlayir
function keepOneProduct(productsArray) {
    let seenProductIds = {};

    let uniqueProducts = productsArray.filter(product => {

        if (!seenProductIds[product.id]) {
            seenProductIds[product.id] = true;
            return true;
        }
        return false;
    });

    return uniqueProducts;
}

//Funksiyaya gonderdiyimiz productun array de nece dene oldugunu qaytarir.
function countP(productId, productsArray) {
    let count = 0;
    productsArray.forEach(product => {
        if (product.id === productId) {
            count++;
        }
    });
    return count;
}


//Array gonderib her productun detali ile birlikde bir div e yigir
function create(products) {

    const container = document.getElementById("productContainer");

    const productsArray = Array.from(products);

    console.log(productsArray.length);


    const pr = keepOneProduct(productsArray);
    console.log(pr.length);


    pr.forEach(product => {

        //Umumi Div
        const productDiv = document.createElement("div");
        productDiv.className = "product mb-[30px] sm:flex sm:w-[1240px] sm:justify-between";
        productDiv.style.borderBottom = "1px solid gray";

        //Textler ucun div
        const textDiv = document.createElement("div");
        textDiv.className = "sm:flex sm:flex-col";

        //title
        const title = document.createElement("h2");
        title.className = "mb-[16px] text-bold mt-[39px] text-bold text-2xl";
        title.innerText = product.title;
        textDiv.appendChild(title);


        //description
        const description = document.createElement("h3");
        description.className = "mb-[43px]";
        description.innerText = product.description;
        textDiv.appendChild(description);


        //price
        const price = document.createElement("label");
        price.className = "mb-[10px] text-xl";
        price.innerText = product.price + "$";
        textDiv.appendChild(price);



        //Sizes and colors
        const sizeAndColors = document.createElement("div");

        sizeAndColors.innerHTML = `<label class="mb-[8px]" for="">SIZE:</label>

        <div id="sizes" class="flex items-center gap-[14px] mb-[32px] justify-items-center">
            
           
        </div>

        <label class="mb-[8px]" for="">COLOR:</label>

        <div id="colors" class="flex justify-items-center gap-[2px] mb-[28px]">
            
        </div>`;

        const sizes = sizeAndColors.querySelector("#sizes");
        const colors = sizeAndColors.querySelector("#colors");

        setSizes(sizes, product);
        setColors(colors, product);

        textDiv.appendChild(sizeAndColors);


        //Image ve buttonlar ve productun countu
        const imageButton = document.createElement("div");
        imageButton.className = "sm:flex mb-[30px]";

        const countButton = document.createElement("div");
        countButton.className = "sm:flex sm:flex-col sm:justify-between sm:mr-[24px] sm:items-center";

        countButton.innerHTML = `<button class="w-[45px] h-[45px] border border-black">+</button>
        <label id="count" for="">${countP(product.id, productsArray)}</label>
      <button class="w-[45px] h-[45px] border border-black">-</button>  `;

        //image
        const image = document.createElement("img");
        image.className = "w-[300px] object-contain";
        image.setAttribute("src", product.gallery[0]);


        imageButton.appendChild(countButton);
        imageButton.appendChild(image);


        productDiv.appendChild(textDiv);
        productDiv.appendChild(imageButton);

        container.appendChild(productDiv);


    });
};


//Cart daki productlarin total qiymeti
function totalPrice(array) {
    let sum=0;

    array.forEach(element => {
        sum=sum+element.price;
    });
    return sum;
}





document.addEventListener("DOMContentLoaded", () => {

    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    create(selectedProducts);

    //Endirim
    const tax = document.getElementById("taxValue");

    //productlarin sayi
    const quantity = document.getElementById("qValue");

    //Total 
    const totalValue = document.getElementById("totalValue");

    //Total 
    const sum = totalPrice(selectedProducts);
    //Endirim ne qeder olacaq
    const taxAmount = (sum * 0.2).toFixed();
    //Endirimli qiymet
    const netTotal = (sum - taxAmount).toFixed();

    
    tax.innerText=(sum*0.2).toFixed()+"$";
    qValue.innerText = selectedProducts.length;
    totalValue.innerText=`${netTotal}$`;
});



const orderBtn=document.getElementById("orderBtn");


orderBtn.addEventListener("click",()=>{
    localStorage.clear();
    location.reload();
    alert("Order is succesfuly");
})