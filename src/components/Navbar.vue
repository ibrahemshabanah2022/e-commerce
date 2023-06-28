<template>
  <!-- Topbar Start -->
  <div class="container-fluid">
    <div class="row bg-secondary py-1 px-xl-5">
      <div class="col-lg-6 d-none d-lg-block">
        <!-- <div class="d-inline-flex align-items-center h-100">
          <a class="text-body mr-3" href="">About</a>
          <a class="text-body mr-3" href="">Contact</a>
          <a class="text-body mr-3" href="">Help</a>
          <a class="text-body mr-3" href="">FAQs</a>
        </div> -->
        <div class="col-lg-4">
          <router-link to="/" class="text-decoration-none">
            <span class="h1 text-uppercase text-primary bg-dark px-2"
              >Multi</span
            >
            <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1"
              >Shop</span
            >
          </router-link>
        </div>
      </div>
      <div class="col-lg-6 text-center text-lg-right">
        <div class="d-inline-flex align-items-center"></div>
        <div class="d-inline-flex align-items-center d-block d-lg-none">
          <router-link @click="authCheck()" to="/Wishlist">
            <a class="btn px-0">
              <i class="fas fa-heart text-primary"></i>
            </a>
          </router-link>
          <router-link @click="authCheck()" to="/cart">
            <a class="btn px-0 ml-3">
              <i class="fas fa-shopping-cart text-primary" ref="cartIcon"></i>
              <span
                class="badge text-secondary border border-secondary rounded-circle"
                style="padding-bottom: 2px"
                >{{ cartCount }}</span
              >
            </a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- Topbar End -->

  <!-- Navbar Start -->
  <div class="container-fluid bg-dark mb-30">
    <div class="row px-xl-5">
      <div class="col-lg-9">
        <nav
          class="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0"
        >
          <router-link to="/"
            ><a href="" class="text-decoration-none d-block d-lg-none">
              <span class="h1 text-uppercase text-dark bg-light px-2"
                >Multi</span
              >
              <span class="h1 text-uppercase text-light bg-primary px-2 ml-n1"
                >Shop</span
              >
            </a></router-link
          >
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div v-if="hasUserToken2" class="navbar-nav mr-auto py-0">
              <router-link to="/"
                ><a href="index.html" class="nav-item nav-link active"
                  >Home</a
                ></router-link
              >

              <router-link to="/login">
                <a class="nav-item nav-link active">Sign in</a>
              </router-link>

              <router-link to="/register">
                <a class="nav-item nav-link active">Sign up</a>
              </router-link>
            </div>

            <div v-if="hasUserToken" class="navbar-nav mr-auto py-0">
              <router-link to="/"
                ><a href="index.html" class="nav-item nav-link active"
                  >Home</a
                ></router-link
              >
              <router-link to="/MyProfile">
                <a class="nav-item nav-link active"> My Profile </a>
              </router-link>

              <router-link to="/">
                <a @click="logout" class="nav-item nav-link active"> logout </a>
              </router-link>
            </div>
            <!-- <a href="shop.html" class="nav-item nav-link">Shop</a>
              <a href="detail.html" class="nav-item nav-link">Shop Detail</a>
              <div class="nav-item dropdown">
                <a
                  href="#"
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  >Pages <i class="fa fa-angle-down mt-1"></i
                ></a>
                <div class="dropdown-menu bg-primary rounded-0 border-0 m-0">
                  <a href="cart.html" class="dropdown-item">Shopping Cart</a>
                  <a href="checkout.html" class="dropdown-item">Checkout</a>
                </div>
              </div>
              <router-link to="/contact">
                <a href="contact.html" class="nav-item nav-link">Contact</a>
              </router-link> -->
            <div class="navbar-nav ml-auto py-0 d-none d-lg-block">
              <router-link @click="authCheck()" to="/Wishlist">
                <a class="btn px-0">
                  <i class="fas fa-heart text-primary"></i>
                </a> </router-link
              ><router-link @click="authCheck()" to="/cart">
                <a class="btn px-0 ml-3">
                  <i
                    class="fas fa-shopping-cart text-primary"
                    ref="cartIcon"
                  ></i>
                  <span
                    class="badge text-secondary border border-secondary rounded-circle"
                    style="padding-bottom: 2px"
                    >{{ cartCount }}</span
                  >
                </a>
              </router-link>
              <!-- <router-link to="/cart">
                <a href="" class="btn px-0 ml-3">
                  <i
                    class="fas fa-shopping-cart text-primary"
                    ref="cartIcon"
                  ></i>

                  <span
                    class="badge text-secondary border border-secondary rounded-circle"
                    style="padding-bottom: 2px"
                    >{{ cart.length }}
                  </span>
                </a>
              </router-link> -->
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <!-- Navbar End -->
</template>
<script>
export default {
  methods: {
    //check if user loged in show wishlist and if not , log in first
    authCheck() {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        window.location.href = "/login";
        return;
      }
    },

    logout() {
      const token = localStorage.getItem("token");

      fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Perform any additional actions after logout, such as redirecting the user
        })
        .catch((error) => {
          console.error(error);
        });

      // Remove the userToken from localStorage
      localStorage.removeItem("userToken");
      // Redirect the user to the login page
      window.location.reload();
    },

    // logout() {
    //   // Remove the userToken from localStorage
    //   localStorage.removeItem("userToken");
    //   // Redirect the user to the login page
    //   window.location.reload();
    // },
  },
  computed: {
    cartCount() {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        return this.$store.state.cartCount;
      } else {
        return 0;
      }
    },
    hasUserToken() {
      return localStorage.getItem("userToken") !== null;
    },
    hasUserToken2() {
      return localStorage.getItem("userToken") == null;
    },
  },
};
</script>
