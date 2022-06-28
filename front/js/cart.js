// Local storage init
const myCart = JSON.parse(localStorage.getItem("products"))

// Main variables
const cart = document.getElementById("cart__items")
let productsID = [] // ID array for sendForm
let totalPriceObj = 0
let totalQuantityObj = 0

// Adding products from the local storage
if (myCart === null || myCart.length == 0) {
    const emptyCart = document.createElement("p")
    emptyCart.innerHTML = "Votre panier est vide" 
    cart.appendChild(emptyCart)
    document.getElementById("cart__order").style.display="none"
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
    localStorage.setItem("products", JSON.stringify(myCart))
    
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
    localStorage.setItem("products", JSON.stringify(myCart))

    // Alert message and page reload
    alert("Produit supprimé");
    location.reload()
}

// First name Regex  
function validateFirstName () {
  
  let firstNameInput = document.getElementById("firstName")
  let firstNameValidate = document.getElementById("firstName").value
  let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
  let order = document.getElementById("order")

  const firstNameRGEX = /^[a-zA-Z ]+$/
  let firstNameResult = firstNameRGEX.test(firstNameValidate)

  if (firstNameResult == false ) {
    firstNameInput.style.backgroundColor="red"
    firstNameErrorMsg.innerHTML = "Votre prénom ne doit comporter que des lettres"
    firstNameErrorMsg.style.display="inherit"
    order.disabled = true
  } else {
    firstNameErrorMsg.style.display="none"
    firstNameInput.style.backgroundColor="white"
    order.disabled = false
  }
}

// Last name Regex
function validateLastName () {
 
  let lastNameInput = document.getElementById("lastName")
  let lastNameValidate = document.getElementById("lastName").value
  let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
  let order = document.getElementById("order")

  const lastNameRGEX = /^[a-zA-Z ]+$/
  let lastNameResult = lastNameRGEX.test(lastNameValidate)

  if (lastNameResult == false ) {
    lastNameInput.style.backgroundColor="red"
    lastNameErrorMsg.innerHTML = "Votre nom ne doit comporter que des lettres"
    lastNameErrorMsg.style.display="inherit"
    order.disabled = true
  } else {
    lastNameErrorMsg.style.display="none"
    lastNameInput.style.backgroundColor="white"
    order.disabled = false
  }
}

// Address Regex
function validateAddress () {

  let addressInput = document.getElementById("address")
  let addressValidate = document.getElementById("address").value
  let addressErrorMsg = document.getElementById("addressErrorMsg")
  let order = document.getElementById("order")

  const addressRGEX = /^[a-zA-Z0-9\s\,\''\-]*$/
  let addressResult = addressRGEX.test(addressValidate)

  if (addressResult == false ) {
    addressInput.style.backgroundColor="red"
    addressErrorMsg.innerHTML = "Votre adresse ne doit pas comporter de caractères spéciaux"
    addressErrorMsg.style.display="inherit"
    order.disabled = true
  } else {
    addressErrorMsg.style.display="none"
    addressInput.style.backgroundColor="white"
    order.disabled = false
  }
}  

// City Regex
function validateCity () {
  
  let cityInput = document.getElementById("city")
  let cityValidate = document.getElementById("city").value
  let cityErrorMsg = document.getElementById("cityErrorMsg")
  let order = document.getElementById("order")

  const cityRGEX = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/

  if (cityResult == false ) {
    cityInput.style.backgroundColor="red"
    cityErrorMsg.innerHTML = "Votre ville ne doit pas comporter que des lettres et certains caractères spéciaux"
    cityErrorMsg.style.display="inherit"
    order.disabled = true
  } else {
    cityInput.style.backgroundColor="green"
    cityErrorMsg.style.display="none"
    order.disabled = false
  }
}

// Email Regex
function validateEmail () {

  let emailInput = document.getElementById("email")
  let emailValidate = document.getElementById("email").value
  let emailErrorMsg = document.getElementById("emailErrorMsg")
  let order = document.getElementById("order")

  const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  let emailResult = emailRGEX.test(emailValidate)

  if (emailResult == false ) {
    emailInput.style.backgroundColor="red"
    emailErrorMsg.innerHTML = "Exemple : kanap@gmail.com"
    emailErrorMsg.style.display="inherit"
    order.disabled = true
  } else {
    emailInput.style.backgroundColor="green"
    emailErrorMsg.style.display="none"
    order.disabled = false
  }
}

// Send the form and place the order
function sendForm () {
    const firstName = document.getElementById("firstName").value
    const lastName =  document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value

    if(firstName !== '' && lastName !== '' && address !== '' && city !== '' && email !== ''){
        fetch(`http://localhost:3000/api/products/order`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
        
                // Create the contact object with the form information
                contact: {
                    firstName : firstName,
                    lastName :  lastName,
                    address : address,
                    city : city,
                    email : email
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
