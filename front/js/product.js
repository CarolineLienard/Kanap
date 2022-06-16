fetch("http://localhost:3000/api/products")
.then(data => data.json())
.then(res => {
    let baseUrl = (window.location).href
    let productID = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
    const info = res.find((el) => el._id === productID)
    console.log(info);

    const imageContainer = document.getElementById("item__img")
    const productImage = document.createElement("img")
    imageContainer.appendChild(productImage)
    productImage.src = info.imageUrl

    const imageTitle = document.getElementById("title")
    imageTitle.innerHTML = info.name

    const productPrice = document.getElementById("price")
    productPrice.innerHTML = info.price

    const productDescription = document.getElementById("description")
    productDescription.innerHTML = info.description

    const colorContainer = document.getElementById("colors")
    for(let colors of info.colors ) {
        const productColor = document.createElement("option")
        colorContainer.appendChild(productColor)
        productColor.innerHTML = colors
    }

})