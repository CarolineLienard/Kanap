// Adding the order ID message
let orderNumber = document.getElementById("orderId")
let baseUrl = (window.location).href
orderNumber.innerHTML = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)