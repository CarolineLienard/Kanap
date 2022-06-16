const myCart = localStorage.getItem("product")
const myCartObj = JSON.parse(myCart)
console.log(myCartObj);

const productColor = myCartObj[0].color
console.log(productColor);

const cart = document.getElementById("cart__items")

const cartContainer = document.createElement("article")
cartContainer.classList.add("cart__item")
cart.appendChild(cartContainer)
