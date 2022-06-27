// Main variables
let products = [] // to get products from the fetch
let baseUrl = (window.location).href
let productID = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)

fetch(`http://localhost:3000/api/products/${productID}`)
.then(data => data.json())
.then(res => {

    // Set all products in the products array
    products = res

    // Add product image
    const imageContainer = document.getElementById("item__img")
    const productImage = document.createElement("img")
    imageContainer.appendChild(productImage)
    productImage.src = res.imageUrl
    productImage.alt = res.altTxt

    // Add product name
    const imageTitle = document.getElementById("title")
    imageTitle.innerHTML = res.name

    // Add product price
    const productPrice = document.getElementById("price")
    productPrice.innerHTML = res.price

    // Add product description
    const productDescription = document.getElementById("description")
    productDescription.innerHTML = res.description

    // Add colors options
    const colorContainer = document.getElementById("colors")
    for(let colors of res.colors ) {
        const productColor = document.createElement("option")
        colorContainer.appendChild(productColor)
        productColor.innerHTML = colors
        productColor.setAttribute( "value", colors )
    }

    // Create the add to cart button
    const addButton = document.getElementById("addToCart")
    addButton.addEventListener("click", addProduct)
})

// Add to cart function
function addProduct () {

    // Get the selected quantity and color
    let quantity = document.getElementById("quantity").value
    let color =  document.getElementById("colors").value

    // Create an object with id, selected color and quantity
    let product = {
        id : productID,
        color : color,
        quantity : quantity,
    }

    // Condition to add an object
    if ( quantity == 0 || color == "choose") { // if no color or quantity selected
        alert("Veuillez choisir une quantité et une couleur")
    }
    else {

        // Set myCart as an array of all the product object, it can be an empty array
        let myCart = JSON.parse(localStorage.getItem("product")) || []

        // Create a variable elementsIndex, the index of the element with the same color and id, in myCart
        const elementsIndex = myCart.findIndex( element => element.id == productID && element.color == color )
        
        // Alert message
        alert("Produit ajouté au panier")

        if(elementsIndex === -1){ // not the same color and id

            // Make a copy of myCart and add the new product to it
            let myCardNew = [...myCart, product]

            // Set the new array with the new object in it, in the local storage
            localStorage.setItem("product", JSON.stringify(myCardNew))
            
        } else{ // the same color and id

            // Create a copy of myCart as myCardAdjust
            let myCartAdjust = [...myCart]

            // Adjust the quantity of the elementIndex in myCartAdjust
            myCartAdjust[elementsIndex] = {...myCartAdjust[elementsIndex], quantity: parseInt(myCartAdjust[elementsIndex].quantity) + parseInt(quantity) }

            // Create the maximum quantity that can be added
            if(myCartAdjust[elementsIndex].quantity > 100){

                // Replace the quantity with 100
                myCartAdjust[elementsIndex] = {...myCartAdjust[elementsIndex], quantity: 100}

                // Alert message
                alert("Quantité de canapé maximale atteinte")
            }

            // Set myCartAdjust in the local storage
            localStorage.setItem("product", JSON.stringify(myCartAdjust))
        }
    }
}