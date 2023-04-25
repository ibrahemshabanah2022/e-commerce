<template>
  <!-- Cart Start -->
  <div class="container-fluid">
    <div class="row px-xl-5">
      <div class="col-lg-8 table-responsive mb-5">
        <table
          class="table table-light table-borderless table-hover text-center mb-0"
        >
          <thead class="thead-dark">
            <tr>
              <th>Products</th>
              <th>Products Name</th>

              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody
            class="align-middle"
            v-for="product in savedProducts"
            :key="product.id"
          >
            <tr>
              <td class="align-middle">
                <img :src="product.images" alt="" style="width: 50px" />
              </td>
              <td>{{ product.title }}</td>
              <td class="align-middle">{{ product.price }}$</td>
              <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px">
                  <div class="input-group-btn">
                    <button
                      @click="decrementQuantity(product)"
                      class="btn btn-sm btn-primary btn-minus"
                      :disabled="product.quantity === 1"
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <span style="padding: 5px">{{ product.quantity }}</span>
                  <div class="input-group-btn">
                    <button
                      @click="incrementQuantity(product)"
                      class="btn btn-sm btn-primary btn-plus"
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td class="align-middle">
                {{ product.price * product.quantity }}$
              </td>
              <td class="align-middle">
                <button
                  @click="removeProduct(product.id)"
                  class="btn btn-sm btn-danger"
                >
                  <i class="fa fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <!-- <tbody
            class="align-middle"
            v-for="product in savedProducts"
            :key="product.id"
          >
            <tr>
              <td class="align-middle">
                <img :src="product.images" alt="" style="width: 50px" />
              </td>
              <td>{{ product.title }}</td>
              <td class="align-middle">{{ product.price }}$</td>
              <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px">
                  <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary btn-minus">
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <span style="padding: 5px">0</span>
                  <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary btn-plus">
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </td>
              <td class="align-middle">150$</td>
              <td class="align-middle">
                <button
                  @click="removeProduct(product.id)"
                  class="btn btn-sm btn-danger"
                >
                  <i class="fa fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody> -->
        </table>
      </div>
      <div class="col-lg-4">
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="bg-secondary pr-3">Cart Summary</span>
        </h5>
        <div class="bg-light p-30 mb-5">
          <div class="border-bottom pb-2">
            <div class="d-flex justify-content-between mb-3">
              <h6>Subtotal</h6>
              <h6>$150</h6>
            </div>
            <div class="d-flex justify-content-between">
              <h6 class="font-weight-medium">Shipping</h6>
              <h6 class="font-weight-medium">$10</h6>
            </div>
          </div>
          <div class="pt-2">
            <div class="d-flex justify-content-between mt-2">
              <h5>Total</h5>
              <h2>${{ totalPrice }}</h2>
            </div>
            <button
              class="btn btn-block btn-primary font-weight-bold my-3 py-3"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Cart End -->
</template>
<script>
export default {
  data() {
    return {
      savedProducts: [],
      cartItems: JSON.parse(localStorage.getItem("product")) || [],
      totalPrice: 0,
    };
  },

  mounted() {
    // Get saved products from local storage
    let products = JSON.parse(localStorage.getItem("product")) || [];

    // Set the savedProducts data property to the retrieved products
    this.savedProducts = products.map((product) => ({
      ...product,
      quantity: product.quantity || 1,
    }));

    // Calculate the total price of the products
    this.totalPrice = this.calculateTotalPrice(this.savedProducts);
  },

  methods: {
    calculateTotalPrice(products) {
      let totalPrice = 0;

      // Loop through the products and add up the prices
      for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price * products[i].quantity;
      }

      return totalPrice;
    },

    incrementQuantity(product) {
      product.quantity++;
      this.totalPrice = this.calculateTotalPrice(this.savedProducts);
      localStorage.setItem("product", JSON.stringify(this.savedProducts));
    },

    decrementQuantity(product) {
      if (product.quantity > 0) {
        product.quantity--;
        this.totalPrice = this.calculateTotalPrice(this.savedProducts);
        localStorage.setItem("product", JSON.stringify(this.savedProducts));
      }
    },

    removeProduct(productId) {
      // Remove the product from the cartItems array
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);

      // Update the local storage with the new cartItems array
      localStorage.setItem("product", JSON.stringify(this.cartItems));

      // Remove the product from the savedProducts array
      this.savedProducts = this.savedProducts.filter(
        (product) => product.id !== productId
      );

      // Recalculate the total price
      this.totalPrice = this.calculateTotalPrice(this.savedProducts);
    },
  },

  watch: {
    savedProducts: {
      handler: function (newVal) {
        let totalQuantity = 0;

        // Loop through the products and add up the quantities
        for (let i = 0; i < newVal.length; i++) {
          totalQuantity += newVal[i].quantity;
        }

        // Update the local storage with the new savedProducts array and total quantity
        localStorage.setItem("product", JSON.stringify(newVal));
        localStorage.setItem("totalQuantity", totalQuantity);
      },
      deep: true,
    },
  },
};
</script>
<!-- <script>
export default {
  data() {
    return {
      savedProducts: [],
      cartItems: JSON.parse(localStorage.getItem("product")) || [],
      totalPrice: 0,
    };
  },

  mounted() {
    // Get saved products from local storage
    let products = JSON.parse(localStorage.getItem("product")) || [];

    // Set the savedProducts data property to the retrieved products
    this.savedProducts = products;

    // Calculate the total price of the products
    this.totalPrice = this.calculateTotalPrice(this.savedProducts);
  },
  methods: {
    calculateTotalPrice(products) {
      let totalPrice = 0;

      // Loop through the products and add up the prices
      for (let i = 0; i < products.length; i++) {
        totalPrice += products[i].price;
      }

      return totalPrice;
    },

    removeProduct(productId) {
      // Remove the product from the cartItems array
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);

      // Update the local storage with the new cartItems array
      localStorage.setItem("product", JSON.stringify(this.cartItems));

      // Remove the product from the savedProducts array
      this.savedProducts = this.savedProducts.filter(
        (product) => product.id !== productId
      );
    },
  },
};
</script> -->
<!-- ************************** to make incement and decrement************** -->
<!-- <template>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - Quantity: {{ product.quantity }}
        <button @click="incrementQuantity(product)">+</button>
        <button @click="decrementQuantity(product)">-</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    // Fetch products from API
    fetch('https://example.com/api/products')
      .then(response => response.json())
      .then(data => {
        // Set initial quantity for each product
        this.products = data.map(product => ({
          ...product,
          quantity: localStorage.getItem(`product-${product.id}`) || 0,
        }));
      });
  },
  methods: {
    incrementQuantity(product) {
      // Increment quantity for product
      product.quantity++;
      // Save quantity to local storage
      localStorage.setItem(`product-${product.id}`, product.quantity);
    },
    decrementQuantity(product) {
      // Decrement quantity for product
      if (product.quantity > 0) {
        product.quantity--;
        // Save quantity to local storage
        localStorage.setItem(`product-${product.id}`, product.quantity);
      }
    },
  },
};
</script> -->
