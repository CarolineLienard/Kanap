let product = []
let baseUrl = (window.location).href
let productID = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
let myCart = JSON.parse(localStorage.getItem("product"))

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

    let obj = {
        id : productID,
        name : product.name,
        quantity : document.getElementById("quantity").value,
        color : document.getElementById("colors").value,
        price : product.price,  
        image : product.imageUrl
        }

    if(myCart){
        let addNewCard = [...myCart, obj]
        localStorage.setItem("product", JSON.stringify(addNewCard))

    } else{
        localStorage.setItem("product", JSON.stringify([obj]))
    }

}