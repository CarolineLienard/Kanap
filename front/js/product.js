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

    const addButton = document.getElementById("addToCart")
    addButton.addEventListener("click", addProduct)
})

function addProduct () {
    let quantity = document.getElementById("quantity").value
    let color =  document.getElementById("colors").value

    let newProduct = {
        id : productID,
        color : color,
        quantity : quantity,
    }

    if ( quantity == 0 || color == "choose") {
        alert("Veuillez choisir une quantité et une couleur")
    }
    else {
        let myCart = JSON.parse(localStorage.getItem("product")) || []
        const elementsIndex = myCart.findIndex( element => element.id == productID && element.color == color )
        alert("Produit ajouté au panier")

        if(elementsIndex === -1){ /* si il retourne -1 c'est que l'objet n'existe pas */ 
            let addNewCard = [...myCart, newProduct] /* ? = if et : = else, ... = copie le tableau existant et lui ajoute un nouvel objet */
            localStorage.setItem("product", JSON.stringify(addNewCard))
            
        }else{
            let newArray = [...myCart]
            newArray[elementsIndex] = {...newArray[elementsIndex], quantity: parseInt(newArray[elementsIndex].quantity) + parseInt(quantity) } /** parseInt = transforme une string en integer */
            if(newArray[elementsIndex].quantity > 100){
                newArray[elementsIndex] = {...newArray[elementsIndex], quantity: 100} /** parseInt = transforme une string en integer */
                alert("Quantité de canapé maximale atteinte")

            }
            localStorage.setItem("product", JSON.stringify(newArray))

        }
    }
}