fetch("http://localhost:3000/api/products")
      .then(data => data.json())
      .then(res => {

        // Get the main container of the products
        const productList = document.getElementById("items")

        for (let info of res){
          
          // Create the product card
          const product = document.createElement("a")
          productList.appendChild(product)
          product.href = "./product.html?id=" + info._id

          // Create the article in the product card
          const article = document.createElement("article")
          product.appendChild(article)

          // Add the product image
          const productImage = document.createElement("img")
          article.appendChild(productImage)
          productImage.src = info.imageUrl
          productImage.alt = info.altTxt

          // Add the product name
          const title = document.createElement("h3")
          title.classList.add("productName")
          article.appendChild(title)
          title.innerHTML = info.name

          // Add the product description
          const description = document.createElement("p")
          description.classList.add("productDescription")
          article.appendChild(description)
          description.innerHTML = info.description
        }
      })