// Local storage init
const myCart = JSON.parse(localStorage.getItem("product"))

// Main variables
const cart = document.getElementById("cart__items")
let productsID = [] // ID array for sendForm
let totalPriceObj = 0
let totalQuantityObj = 0

// Adding products from the local storage
if (myCart === null || myCart == 0) {
    const emptyCart = document.createElement("p")
    emptyCart.innerHTML = "Votre panier est vide" 
    cart.appendChild(emptyCart)
} else {
for ( let info of myCart ) {
    const productID = info.id
    fetch(`http://localhost:3000/api/products/${productID}`)
    .then(data => data.json())
    .then(res => {

        // Get the product informations
        const productName = res.name
        const productImage = res.imageUrl
        const productPrice = res.price
        productsID.push(productID) // Send productID in productsID array 

        // Create the article element
        const cartContainer = document.createElement("article")
        cartContainer.classList.add("cart__item")
        cart.appendChild(cartContainer)

        // Create the image container in article
        const imageContainer = document.createElement("div")
        imageContainer.classList.add("cart__item__img")
        cartContainer.appendChild(imageContainer)

        // Adding the product image
        const image = document.createElement("img")
        image.src = productImage
        image.alt = res.altTxt
        imageContainer.appendChild(image)

        // Create the cart_item_content div 
        const content = document.createElement("div")
        content.classList.add("cart__item__content")
        cartContainer.appendChild(content)

        // Create the name container
        const contentDescription = document.createElement("div")
        contentDescription.classList.add("cart__item__content__description")
        content.appendChild(contentDescription)

        // Adding product name
        const name = document.createElement("h2")
        contentDescription.appendChild(name)
        name.innerHTML = productName

        // Adding product color
        const color = document.createElement("p")
        contentDescription.appendChild(color)
        color.innerHTML = info.color

        // Adding product price
        const price = document.createElement("p")
        contentDescription.appendChild(price)
        price.innerHTML = productPrice + "€"

        // Create the div settings 
        contentSettings = document.createElement("div")
        contentSettings.classList.add("cart__item__content__settings")
        content.appendChild(contentSettings)

        // Create the settings quantity div
        const contentSettingsQty = document.createElement("div")
        contentSettingsQty.classList.add("cart__item__content__settings__quantity")
        contentSettings.appendChild(contentSettingsQty)

        // Add label for quantity input
        const qty = document.createElement("p")
        contentSettingsQty.appendChild(qty)
        qty.innerHTML = "Qté:"

        // Add quantity input
        const qtyInput = document.createElement("input")
        qtyInput.addEventListener("change", (e) => handleChange(e, productID, info.color))
        qtyInput.type = "number"
        qtyInput.classList.add("itemQuantity")
        qtyInput.value = info.quantity
        qtyInput.max = 100
        qtyInput.min = 1
        qtyInput.name = "itemQuantity"
        contentSettingsQty.appendChild(qtyInput)

        // Create deleted button
        const deleted = document.createElement("div")
        deleted.classList.add("cart__item__content__settings__delete")
        deleted.addEventListener('click', () => deleteProduct(productID, info.color))
        contentSettings.appendChild(deleted)
        const deletedButton = document.createElement("p")
        deletedButton.classList.add("deleteItem")
        deletedButton.innerHTML = "Supprimer"
        deleted.appendChild(deletedButton)

        // Getting total quantity
        totalQuantityObj = totalQuantityObj + parseInt(info.quantity)
        const totalQuantity = document.getElementById("totalQuantity")
        totalQuantity.innerHTML = totalQuantityObj
        
        // Getting total price
        const totalPrice = document.getElementById("totalPrice")
        totalPriceObj = totalPriceObj + (parseInt(productPrice) * parseInt(info.quantity))
        totalPrice.innerHTML = totalPriceObj

        // Adding event on place order button
        const orderButton = document.getElementById("order")
        orderButton.addEventListener("click", sendForm)
    }) 
}}

// Update the item quantity
function handleChange (e, id, color) {

    // Find the index of the element with the same ID and color
    const elementsIndex = myCart.findIndex( element => element.id == id && element.color == color )
    
    // Copying the element index, updating the quantity and put it in the local storage
    myCart[elementsIndex] = {...myCart[elementsIndex], quantity: e.target.value } 
    localStorage.setItem("product", JSON.stringify(myCart))
    
    // Alert message and page reload
    alert("Quantité mise à jour")
    location.reload()
}

// Delete the element from the local storage
function deleteProduct(id, color){

    // Find the index of the element with the same color and ID
    const elementsIndex = myCart.findIndex( element => element.id == id && element.color == color )
    
    // Deleted the element and update the local storage
    myCart.splice(elementsIndex, 1);
    localStorage.setItem("product", JSON.stringify(myCart))

    // Alert message and page reload
    alert("Produit supprimé");
    location.reload()
}

//// REGEXs
// no regex for addresses, "required" attribute speaks for himself
// variables values for the form :
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");

// email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}
// simple RegEx for names : accepted characters by RegEx

const regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i;

// first name
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

// last name
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}

// city
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}

// Send the form and place the order
function sendForm () {
    if (myCart === null || myCart == 0) {
        alert("Veuillez ajouter des produits")
    } else { 
        fetch(`http://localhost:3000/api/products/order`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            // Create the contact object with the form information
            contact: {
                firstName : document.getElementById("firstName").value,
                lastName :  document.getElementById("lastName").value,
                address : document.getElementById("address").value,
                city : document.getElementById("city").value,
                email : document.getElementById("email").value
            },

            // Sending the productsID array as the variable "products" 
            products : productsID
        })
        })
        .then(data => data.json())
        .then(res => {

                // Clear and set the order ID in the local storage
                localStorage.clear()
                localStorage.setItem("orderId", res.orderId);

                // Alert message and redirect to the confirmation page
                alert("Commande effectuée")
                window.location.replace(`./confirmation.html?orderId=${res.orderId}`)
        })
        .catch((err) => {
            alert (err.message)
        })
    }
}