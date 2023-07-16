<template>
  <!-- Cart Start -->
  <Navbar />
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
                <img :src="product.image" alt="" style="width: 50px" />
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
                      style="background-color: #f1d333"
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                  <span style="padding: 5px">{{ product.quantity }}</span>
                  <div class="input-group-btn">
                    <button
                      @click="incrementQuantity(product)"
                      class="btn btn-sm btn-primary btn-plus"
                      style="background-color: #f1d333"
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
                  v-on:click="showSwal(product)"
                  @click="removeProduct(product.id)"
                  class="btn btn-sm btn-danger"
                >
                  <i class="fa fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <h5 class="section-title position-relative text-uppercase mb-3">
          <span class="pr-3" style="background-color: #f5f5f5"
            >Cart Summary</span
          >
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
              class="btn btn-block font-weight-bold my-3 py-3"
              style="background-color: #f1d333"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
  <!-- Cart End -->
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
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
    // Remove a product from the cart
    //  removeProduct(productId) {
    //   fetch('http://127.0.0.1:8000/api/cart/deleteproduct', {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       cart_product_id: productId
    //     })
    //   })
    //  .then(response => {
    //     if (response.ok) {
    //       // Product was removed from the cart
    //       console.log('Product removed from cart');
    //     } else {
    //       // Error removing product from the cart
    //       console.log('Error removing product from cart');
    //     }
    //   })
    //  .catch(error => {
    //     // Error removing product from the cart
    //     console.log('Error removing product from cart:', error);
    //   });
    // },
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

      // Update the cart count
      // this.showSwal({ id: productId });
      const userToken = localStorage.getItem("userToken");

      fetch("http://127.0.0.1:8000/api/cart/deleteproduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          cart_product_id: productId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // Product was removed from the cart
            console.log("Product removed from cart");
          } else {
            // Error removing product from the cart
            console.log("Error removing product from cart");
          }
        })
        .catch((error) => {
          // Error removing product from the cart
          console.log("Error removing product from cart:", error);
        });
    },
    showSwal(product) {
      let productt = JSON.parse(localStorage.getItem("product")) || [];
      const tIndex = productt.findIndex((p) => p.id === product.id);
      if (tIndex === -1) {
        this.$store.commit("decreaseCartCount", 0);
      } else {
        this.$store.commit("decreaseCartCount", 1);
      }
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
