document.addEventListener("DOMContentLoaded", function() {
  var myOrdersBtn = document.getElementById("my-orders-btn");
  var categories = document.getElementById("categories");
  var orders = document.getElementById("orders");

  myOrdersBtn.addEventListener("click", function() {
    categories.style.display = "none";
    orders.style.display = "block";

    displayOrders();
  });

  function displayOrders() {
    var savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (savedOrders.length === 0) {
      orders.innerHTML = "У вас немає збережених замовлень.";
      return;
    }

    var ordersHTML = "<ul>";
    savedOrders.forEach(function(order, index) {
      ordersHTML += "<li><a href='#' class='order-link' data-order-index='" + index + "'>" + order.date + " - " + order.price + "</a></li>";
    });
    ordersHTML += "</ul>";

    orders.innerHTML = ordersHTML;

    var orderLinks = document.getElementsByClassName("order-link");
    Array.prototype.forEach.call(orderLinks, function(link) {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        var orderIndex = this.getAttribute("data-order-index");
        displayOrderDetails(savedOrders[orderIndex]);
      });
    });
  }

  function displayOrderDetails(order) {
    var orderDetailsHTML = "<p><strong>Дата:</strong> " + order.date + "</p>";
    orderDetailsHTML += "<p><strong>Ціна:</strong> " + order.price + "</p>";
    orderDetailsHTML += "<p><strong>Деталі:</strong> " + order.details + "</p>";
    orderDetailsHTML += "<button class='delete-order-btn'>Видалити замовлення</button>";

    var orderDetails = document.createElement("div");
    orderDetails.innerHTML = orderDetailsHTML;
    orders.appendChild(orderDetails);

    var deleteBtn = orderDetails.getElementsByClassName("delete-order-btn")[0];
    deleteBtn.addEventListener("click", function() {
      deleteOrder(order);
    });
  }

  function deleteOrder(order) {
    var savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    var orderIndex = savedOrders.findIndex(function(savedOrder) {
      return savedOrder.date === order.date && savedOrder.price === order.price;
    });

    if (orderIndex !== -1) {
      savedOrders.splice(orderIndex, 1);

      localStorage.setItem("orders", JSON.stringify(savedOrders));

      orders.innerHTML = "";
      displayOrders();
    }
  }
});
