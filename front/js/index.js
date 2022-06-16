fetch("http://localhost:3000/api/products")
      .then(data => data.json())
      .then(res => {
        console.log(res);
        const productList = document.getElementById("items")
        for (let info of res){
          const product = document.createElement("a")
          productList.appendChild(product)
          product.href = "./product.html?id=" + info._id

          const article = document.createElement("article")
          product.appendChild(article)

          const productImage = document.createElement("img")
          article.appendChild(productImage)
          productImage.src = info.imageUrl

          const title = document.createElement("h3")
          title.classList.add("productName")
          article.appendChild(title)
          title.innerHTML = info.name

          const description = document.createElement("p")
          description.classList.add("productDescription")
          article.appendChild(description)
          description.innerHTML = info.description
        }
      })

      