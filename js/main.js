var productsContainer = document.getElementById("product-table-container");
var warningMessage = document.getElementById("warning-msg");
var tableBody = document.getElementById("table-body");

var products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
var mode = 'add';
var tempIndex;

function handleRenderData() {
  if (products.length !== 0) {
    productsContainer.classList.remove("d-none");
    warningMessage.classList.add("d-none");

    var rows_elements = "";

    for (var i = 0; i < products.length; i++) {
      rows_elements += `
            <tr>
            <th>${i + 1}</th>
            <td>${products[i].name}</td>
            <td>${products[i].cat}</td>
            <td>${products[i].price}</td>
            <td>
            ${products[i].desc}
            </td>
            <td>
              <button class="btn btn-outline-success" onclick="updateData(${i})">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="deleteData(${i})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
    }

    tableBody.innerHTML = rows_elements;
  } else {
    warningMessage.classList.remove("d-none");
    productsContainer.classList.add("d-none");
  }
}

handleRenderData();

// Get input elements
var productName = document.getElementById("product_name");
var productCat = document.getElementById("product_category");
var productPrice = document.getElementById("product_price");
var productDesc = document.getElementById("product_desc");
var createBtn = document.getElementById("create-btn");
var productForm = document.getElementById("product-form");
var clearBtn = document.getElementById("clear-btn");

// Form submission
productForm.onsubmit = function (event) {
  event.preventDefault();
  
  var product = {
    name: productName.value,
    cat: productCat.value,
    price: productPrice.value,
    desc: productDesc.value,
  };

  if (mode === 'add') {
    products.push(product);
  } else {
    products[tempIndex] = product;
    mode = 'add';
    createBtn.innerHTML = 'Add Product';
  }

  localStorage.setItem('products', JSON.stringify(products));
  handleRenderData();
  clearData();
};

// Clear inputs
clearBtn.onclick = function () {
  clearData();
};

function clearData() {
  productName.value = '';
  productCat.value = '';
  productPrice.value = '';
  productDesc.value = '';
}

// Delete data
function deleteData(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  handleRenderData();
}

// Update data
function updateData(index) {
  productName.value = products[index].name;
  productCat.value = products[index].cat;
  productPrice.value = products[index].price;
  productDesc.value = products[index].desc;
  
  createBtn.innerHTML = 'Update';
  mode = 'update';
  tempIndex = index;
  document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
}
