fetch("http://localhost:3000/api/products")
      .then(data => data.json())
      .then(res => {
        console.log(res);
      })