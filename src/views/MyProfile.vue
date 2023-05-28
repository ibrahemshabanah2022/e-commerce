<template>
  <div class="container light-style flex-grow-1 container-p-y">
    <h4 class="font-weight-bold py-3 mb-4">Account settings</h4>

    <div class="card overflow-hidden">
      <div class="row no-gutters row-bordered row-border-light">
        <div class="col-md-3 pt-0">
          <div class="list-group list-group-flush account-settings-links">
            <a
              class="list-group-item list-group-item-action active"
              data-toggle="list"
              href="#account-general"
              >General</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#account-change-password"
              >Change password</a
            >
            <router-link to="/Wishlist">
              <a class="list-group-item list-group-item-action">My Wishlist</a>
            </router-link>
            <router-link to="/cart">
              <a class="list-group-item list-group-item-action">My Cart</a>
            </router-link>
          </div>
        </div>
        <div class="col-md-9">
          <div class="tab-content">
            <div class="tab-pane fade active show" id="account-general">
              <!-- <div class="card-body media align-items-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  class="d-block ui-w-80"
                />
                <div class="media-body ml-4">
                  <label class="btn btn-outline-primary">
                    Upload new photo
                    <input type="file" class="account-settings-fileinput" />
                  </label>
                  &nbsp;
                  <button type="button" class="btn btn-default md-btn-flat">
                    Reset
                  </button>

                  <div class="text-light small mt-1">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </div>
                </div>
              </div> -->
              <hr class="border-light m-0" />

              <div class="card-body">
                <div class="form-group">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" v-model="userName" />
                </div>
                <br />
                <div class="form-group">
                  <label class="form-label">E-mail</label>
                  <input
                    type="text"
                    class="form-control mb-1"
                    v-model="userEmail"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="account-change-password">
              <div class="card-body pb-2">
                <div class="form-group">
                  <label class="form-label">New password</label>
                  <input
                    id="password"
                    v-model="userPassword"
                    type="password"
                    class="form-control"
                  /><br />
                  <input
                    type="checkbox"
                    @click="togglePasswordVisibility()"
                  />&nbsp;Show Password
                </div>
                <br />
                <div class="form-group">
                  <label class="form-label">Repeat new password</label>
                  <input
                    id="repeatPassword"
                    type="password"
                    class="form-control"
                    v-model="repeatPassword"
                  /><br />
                  <input
                    type="checkbox"
                    @click="togglePasswordVisibility2()"
                  />&nbsp;Show Repeated Password
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right mt-3">
      <button @click="updateUserData" type="button" class="btn btn-primary">
        Save changes</button
      >&nbsp;
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: null,
      userName: null,
      userEmail: null,
      userPassword: null,
      repeatPassword: null,
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    togglePasswordVisibility() {
      var passwordField = document.getElementById("password");
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    },
    togglePasswordVisibility2() {
      var passwordField = document.getElementById("repeatPassword");
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    },
    fetchUserData() {
      fetch("http://127.0.0.1:8000/api/authuser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.userId = data.id;
          this.userName = data.name;
          this.userEmail = data.email;
          this.userPassword = data.password;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateUserData() {
      if (this.userPassword !== this.repeatPassword) {
        alert("Passwords do not match");
        return;
      }
      fetch("http://127.0.0.1:8000/api/updatecustomer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          name: this.userName,
          email: this.userEmail,
          password: this.userPassword,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Update the user data in the component
          this.userName = data.name;
          this.userEmail = data.email;
          this.userPassword = data.password;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
body {
  background: #f5f5f5;
  margin-top: 20px;
}

.ui-w-80 {
  width: 80px !important;
  height: auto;
}

.btn-default {
  border-color: rgba(24, 28, 33, 0.1);
  background: rgba(0, 0, 0, 0);
  color: #4e5155;
}

label.btn {
  margin-bottom: 0;
}

.btn-outline-primary {
  border-color: #26b4ff;
  background: transparent;
  color: #26b4ff;
}

.btn {
  cursor: pointer;
}

.text-light {
  color: #babbbc !important;
}

.btn-facebook {
  border-color: rgba(0, 0, 0, 0);
  background: #3b5998;
  color: #fff;
}

.btn-instagram {
  border-color: rgba(0, 0, 0, 0);
  background: #000;
  color: #fff;
}

.card {
  background-clip: padding-box;
  box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
}

.row-bordered {
  overflow: hidden;
}

.account-settings-fileinput {
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.account-settings-links .list-group-item.active {
  font-weight: bold !important;
}
html:not(.dark-style) .account-settings-links .list-group-item.active {
  background: transparent !important;
}
.account-settings-multiselect ~ .select2-container {
  width: 100% !important;
}
.light-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}
.light-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}
.material-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}
.material-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}
.dark-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(255, 255, 255, 0.03) !important;
}
.dark-style .account-settings-links .list-group-item.active {
  color: #fff !important;
}
.light-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}
.light-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}
</style>
