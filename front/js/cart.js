const myCart = JSON.parse(localStorage.getItem("product"))
const cart = document.getElementById("cart__items")
let totalPriceObj = 0
let totalQuantityObj = 0

for ( let info of myCart ) {
    const productID = info.id

    fetch(`http://localhost:3000/api/products/${productID}`)
    .then(data => data.json())
    .then(res => {
        const productName = res.name
        const productImage = res.imageUrl
        const productPrice = res.price

        const cartContainer = document.createElement("article")
        cartContainer.classList.add("cart__item")
        cart.appendChild(cartContainer)

        const imageContainer = document.createElement("div")
        imageContainer.classList.add("cart__item__img")
        cartContainer.appendChild(imageContainer)

        const image = document.createElement("img")
        image.src = productImage
        imageContainer.appendChild(image)

        const content = document.createElement("div")
        content.classList.add("cart__item__content")
        cartContainer.appendChild(content)

        const contentDescription = document.createElement("div")
        contentDescription.classList.add("cart__item__content__description")
        content.appendChild(contentDescription)

        const name = document.createElement("h2")
        contentDescription.appendChild(name)
        name.innerHTML = productName

        const color = document.createElement("p")
        contentDescription.appendChild(color)
        color.innerHTML = info.color

        const price = document.createElement("p")
        contentDescription.appendChild(price)
        price.innerHTML = productPrice + "€"

        contentSettings = document.createElement("div")
        contentSettings.classList.add("cart__item__content__settings")
        content.appendChild(contentSettings)

        const contentSettingsQty = document.createElement("div")
        contentSettingsQty.classList.add("cart__item__content__settings__quantity")
        contentSettings.appendChild(contentSettingsQty)

        const qty = document.createElement("p")
        contentSettingsQty.appendChild(qty)
        qty.innerHTML = "Qté:"

        const qtyInput = document.createElement("input")
        qtyInput.addEventListener("change", (e) => handleChange(e, productID, info.color))
        qtyInput.type = "number"
        qtyInput.classList.add("itemQuantity")
        qtyInput.value = info.quantity
        qtyInput.max = 100
        qtyInput.min = 1
        qtyInput.name = "itemQuantity"
        contentSettingsQty.appendChild(qtyInput)

        const deteled = document.createElement("div")
        deteled.classList.add("cart__item__content__settings__delete")
        deteled.addEventListener('click', () => deleteProduct(productID, info.color))
        contentSettings.appendChild(deteled)

        const deteledButton = document.createElement("p")
        deteledButton.classList.add("deleteItem")
        deteledButton.innerHTML = "Supprimer"
        deteled.appendChild(deteledButton)

        totalPriceObj = totalPriceObj + (parseInt(productPrice) * parseInt(info.quantity))
        totalQuantityObj = totalQuantityObj + parseInt(info.quantity)
        const totalPrice = document.getElementById("totalPrice")
        const totalQuantity = document.getElementById("totalQuantity")
        totalQuantity.innerHTML = totalQuantityObj
        totalPrice.innerHTML = totalPriceObj
    }) 
}

function handleChange (e, id, color) {
    const elementsIndex = myCart.findIndex( element => element.id == id && element.color == color )
    myCart[elementsIndex] = {...myCart[elementsIndex], quantity: e.target.value } 
    localStorage.setItem("product", JSON.stringify(myCart))
    alert("Quantité mise à jour")
    location.reload()
}

function deleteProduct(id, color){
    const elementsIndex = myCart.findIndex( element => element.id == id && element.color == color )
    alert("Produit supprimé");
    myCart.splice(elementsIndex, 1);
    localStorage.setItem("product", JSON.stringify(myCart))
    location.reload()
}

