let productsJSON = `[
{

"name": "Футболка Sima",
"id": "short",
"praice": "2000 рублей" 
},
{
"name": "Шопер Sima",
"id": "shoper",
"praice": "1500 рублей"
},
{
"name": "Худи Sima",
"id": "hoodie",
"praice": "2500 рублей"
}
]`;

let jazz = JSON.parse(productsJSON);
console.log(productsJSON);
let div = document.createElement("div");
div.className = "productDiv";
updateCartCount();
for (let newe of jazz) {
  let div2 = document.createElement("div");
  div2.className = "productDiv2";

  let button = document.createElement("button");
  button.innerText = "В корзину";
  button.addEventListener("click", () => {
   addToCart(newe);
  });
  button.classList.add("btn");

  let pPraice = document.createElement("p");
  let pName = document.createElement("p");
  let img = document.createElement("img");
  img.src = `${newe.id}.png`;
  pName.textContent = newe.name;
  pPraice.textContent = newe.praice;

  div2.append(img);
  div2.append(pName);
  div2.append(pPraice);

  main.append(div);
  div.append(div2);
  div2.append(button);
}

function addToCart(product){
let cart = JSON.parse(localStorage.getItem("cart")) || {};
if (cart[product.id]) {
  cart[product.id].amount += 1;
} else {
  cart[product.id] = { ...product, amount: 1 };
}
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let itemCount = 0;
  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      itemCount += cart[key].amount;
    }
  }
  document.querySelector("nav span").textContent = itemCount;
}

