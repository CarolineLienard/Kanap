let product = []
let baseUrl = (window.location).href
let productID = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)

fetch(`http://localhost:3000/api/products/${productID}`)
.then(data => data.json())
.then(res => {
    product = res
    const imageContainer = document.getElementById("item__img")
    const productImage = document.createElement("img")
    imageContainer.appendChild(productImage)
    productImage.src = res.imageUrl

    const imageTitle = document.getElementById("title")
    imageTitle.innerHTML = res.name

    const productPrice = document.getElementById("price")
    productPrice.innerHTML = res.price

    const productDescription = document.getElementById("description")
    productDescription.innerHTML = res.description

    const colorContainer = document.getElementById("colors")
    for(let colors of res.colors ) {
        const productColor = document.createElement("option")
        colorContainer.appendChild(productColor)
        productColor.innerHTML = colors
        productColor.setAttribute( "value", colors )
    }
})

function addProduct () {
    let quantity = document.getElementById("quantity").value
    let color =  document.getElementById("colors").value

    console.log(typeof quantity)

    let obj = {
        id : productID,
        color : document.getElementById("colors").value,
    }

    if ( quantity == 0 || color == "choose") {
        alert("Veuillez choisir une quantité et une couleur")
    }
    else {
        for( let i = 0; i < parseInt(quantity); i++) {
            let myCart = JSON.parse(localStorage.getItem("product")) || []
            let addNewCard = myCart.length === 0 ? [obj] : [...myCart, obj] /* ? = if et : = else, ... = copie le tableau existant et lui ajoute un nouvel objet */
            localStorage.setItem("product", JSON.stringify(addNewCard))            
        }
    }
}        