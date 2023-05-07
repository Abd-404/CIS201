console.log(cartElementIds);
console.log(nbCartItems);
const productsCart = document.getElementById("products");
const totalPriceElement = document.getElementById("total-price");

for (let index of cartElementIds) {
  let productRow = document.createElement("tr");
  productRow.innerHTML = `<td class="product-item">
  <img
    src="/src/images/${products[index].name}.png"
    alt="${products[index].fullName}"
  />
  <p>${products[index].fullName}</p>
</td>
<td><span>${products[index].price}</span> SAR</td>
<td>
  <input type="number" value="1" min="1" class="quantity" />
</td>
<td><span class="total-item-price">${products[index].price}</span> SAR</td>
<td>
  <button class="button removeFromCart" data-id="${products[index].id}">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g fill="currentColor">
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
        />
        <path
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
        />
      </g>
    </svg>
  </button>
</td>`;
  productsCart.appendChild(productRow);
}

function calculateTotalPrice() {
  let totalPrice = 0;
  let indivisualPrice = document.querySelectorAll(".total-item-price");
  for (let item of indivisualPrice) {
    totalPrice += +item.textContent;
  }
  totalPriceElement.textContent = totalPrice;
}

calculateTotalPrice();

function updatePrice(event) {
  const price =
    +event.target.parentElement.previousElementSibling.firstElementChild
      .textContent;
  const updatedQuantity = event.target.value;
  const totalItemPriceElement =
    event.target.parentElement.nextElementSibling.firstElementChild;
  totalItemPriceElement.textContent = updatedQuantity * price;
  calculateTotalPrice();
}

function removeFromCart(event) {
  let rowToRemove = event.currentTarget.parentElement.parentElement;
  let priceToRemove =
    event.currentTarget.parentElement.previousElementSibling.firstElementChild;
  let elementId = parseInt(event.currentTarget.dataset.id);
  let position = cartElementIds.indexOf(elementId);
  rowToRemove.style.display = "none";
  priceToRemove.textContent = 0;
  calculateTotalPrice();
  if (position !== -1) {
    cartElementIds.splice(position, 1);
  }
  nbCartItems--;
  document.getElementById("badge").textContent = nbCartItems;
}

const quantityElements = document.querySelectorAll(".quantity");
for (let inputs of quantityElements) {
  inputs.addEventListener("change", updatePrice);
}

const removeButtons = document.querySelectorAll(".removeFromCart");
for (let button of removeButtons) {
  button.addEventListener("click", removeFromCart);
}

function saveCartToLocalStorage() {
  localStorage.setItem("cartElementIds", JSON.stringify(cartElementIds));
}

window.addEventListener("beforeunload", saveCartToLocalStorage);
