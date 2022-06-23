const myCart = JSON.parse(localStorage.getItem("product"))
const cart = document.getElementById("cart__items")

for ( let info of myCart ) {
    const productID = info.id
    
    fetch(`http://localhost:3000/api/products/${productID}`)
    .then(data => data.json())
    .then(res => {
        const productName = res.name
        const productImage = res.imageUrl
        const productPrice = res.price

        console.log(res);

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
        qtyInput.type = "number"
        qtyInput.classList.add("itemQuantity")
        qtyInput.value = info.quantity
        qtyInput.max = 100
        qtyInput.min = 1
        qtyInput.name = "itemQuantity"
        contentSettingsQty.appendChild(qtyInput)

        const deteled = document.createElement("div")
        deteled.classList.add("cart__item__content__settings__delete")
        contentSettings.appendChild(deteled)

        const deteledButton = document.createElement("p")
        deteledButton.classList.add("deleteItem")
        deteledButton.innerHTML = "Supprimer"
        deteled.appendChild(deteledButton)
    }) 
}
