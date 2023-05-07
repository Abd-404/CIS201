const LaptopProducts = document.getElementById("Laptop-Products");
const XboxProducts = document.getElementById("Xbox-Products");
const PlayStation = document.getElementById("PlayStation-Products");
cartElementIds = JSON.parse(localStorage.getItem("cartElementIds")) || [];
for (let i = 0; i < 16; i++) {
  const productCard = document.createElement("li");
  productCard.className = "card";
  productCard.setAttribute("data-id", products[i].id);
  productCard.innerHTML = `<img src="/src/images/${products[i].name}.png" alt="${products[i].fullName}" />
    <div class="description">
      <h3>${products[i].fullName}</h3>
      <p>
       ${products[i].description}
      </p>
      <h4>${products[i].price} SAR</h4>
    </div>
    <button class="button addToCart">Add to Cart</button>
    <div class="added">
              <p>Added!</p>
              <button class="button">
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
            </div>`;
  if (i < 5) LaptopProducts.appendChild(productCard);
  else if (i < 11) XboxProducts.appendChild(productCard);
  else PlayStation.appendChild(productCard);
}

function saveCartToLocalStorage() {
  localStorage.setItem("cartElementIds", JSON.stringify(cartElementIds));
}

window.addEventListener("beforeunload", saveCartToLocalStorage);

function addToCart(event) {
  let parentElement = event.target.parentElement;
  let elementId = parentElement.dataset.id;
  cartElementIds.push(parseInt(elementId));
  let nextElement = event.target.nextElementSibling;
  nextElement.style.display = "flex";
  event.target.style.display = "none";
  nbCartItems++;
  document.getElementById("badge").textContent = nbCartItems;
}

function deleteCart(event) {
  let parentElement = event.currentTarget.parentElement;
  let previousElement = parentElement.previousElementSibling;
  let elementId = parseInt(parentElement.parentElement.dataset.id);
  let index = cartElementIds.indexOf(elementId);
  if (index !== -1) {
    cartElementIds.splice(index, 1);
  }
  parentElement.style.display = "none";
  previousElement.style.display = "block";
  nbCartItems--;
  document.getElementById("badge").textContent = nbCartItems;
}

const cartButtons = document.querySelectorAll(".addToCart");
for (let buttons of cartButtons) {
  buttons.addEventListener("click", addToCart);
}

const deleteButtons = document.querySelectorAll(".added button");
for (let buttons of deleteButtons) {
  buttons.addEventListener("click", deleteCart);
}

// Simulate click event for previously clicked buttons on page load
for (let i = 0; i < cartElementIds.length; i++) {
  const id = cartElementIds[i];
  const button = document.querySelector(`[data-id="${id}"] .addToCart`);
  if (button) {
    button.style.display = "none";
    button.nextElementSibling.style.display = "flex";
  }
}
