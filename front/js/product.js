let baseUrl = (window.location).href
let productID = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
fetch(`http://localhost:3000/api/products/${productID}`)
.then(data => data.json())
.then(res => {
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
    const productQuantity = document.getElementById("quantity").value
    const productColor = document.getElementById("colors").value
    const productPrice = document.getElementById("price").innerHTML
    const productName = document.getElementById("title").innerHTML

    let addProduct = [
        {
        id : productID,
        name : productName,
        quantity : productQuantity,
        color : productColor,
        price : productPrice,    
        }
    ]

    localStorage.setItem("product", JSON.stringify(addProduct))
    alert("Produit ajouté au panier")
}