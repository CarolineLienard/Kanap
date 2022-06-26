let orderNumber = document.getElementById("orderId")
let baseUrl = (window.location).href
orderNumber.innerHTML = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
