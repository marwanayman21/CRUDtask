class ProductManager {
  constructor() {
    this.productsContainer = document.getElementById("product-table-container");
    this.warningMessage = document.getElementById("warning-msg");
    this.tableBody = document.getElementById("table-body");

    this.products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    this.mode = 'add';
    this.tempIndex = null;

    this.productName = document.getElementById("product_name");
    this.productCat = document.getElementById("product_category");
    this.productPrice = document.getElementById("product_price");
    this.productDesc = document.getElementById("product_desc");
    this.createBtn = document.getElementById("create-btn");
    this.productForm = document.getElementById("product-form");
    this.clearBtn = document.getElementById("clear-btn");

    this.productForm.onsubmit = (event) => this.handleFormSubmit(event);
    this.clearBtn.onclick = () => this.clearData();

    this.renderData();
  }

  renderData() {
    if (this.products.length !== 0) {
      this.productsContainer.classList.remove("d-none");
      this.warningMessage.classList.add("d-none");

      let rowsElements = "";

      for (let i = 0; i < this.products.length; i++) {
        rowsElements += `
          <tr>
            <th>${i + 1}</th>
            <td>${this.products[i].name}</td>
            <td>${this.products[i].cat}</td>
            <td>${this.products[i].price}</td>
            <td>${this.products[i].desc}</td>
            <td>
              <button class="btn btn-outline-success" onclick="productManager.updateData(${i})">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="productManager.deleteData(${i})">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        `;
      }

      this.tableBody.innerHTML = rowsElements;
    } else {
      this.warningMessage.classList.remove("d-none");
      this.productsContainer.classList.add("d-none");
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (this.productName.value.trim() === '' || this.productCat.value.trim() === '' || this.productPrice.value.trim() === '' || this.productDesc.value.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    const product = {
      name: this.productName.value,
      cat: this.productCat.value,
      price: this.productPrice.value,
      desc: this.productDesc.value,
    };

    if (this.mode === 'add') {
      this.products.push(product);
    } else {
      this.products[this.tempIndex] = product;
      this.mode = 'add';
      this.createBtn.innerHTML = 'Add Product';
    }

    localStorage.setItem('products', JSON.stringify(this.products));
    this.renderData();
    this.clearData();
  }

  clearData() {
    this.productName.value = '';
    this.productCat.value = '';
    this.productPrice.value = '';
    this.productDesc.value = '';
  }

  deleteData(index) {
    this.products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.renderData();
  }

  updateData(index) {
    this.productName.value = this.products[index].name;
    this.productCat.value = this.products[index].cat;
    this.productPrice.value = this.products[index].price;
    this.productDesc.value = this.products[index].desc;

    this.createBtn.innerHTML = 'Update';
    this.mode = 'update';
    this.tempIndex = index;
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
  }
}

// Instantiate the ProductManager class
const productManager = new ProductManager();
