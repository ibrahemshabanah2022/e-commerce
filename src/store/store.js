import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      cartCount:
        localStorage.product != undefined
          ? JSON.parse(localStorage.product).length
          : 0,
    };
  },
  mutations: {
    updateCartCount(state, val) {
      state.cartCount += val;
    },
  },
});

export default store;
