import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  getters: {
    itemInCart(state) {
      return state.cart;
    },
  },
  mutations: {
    ITEM_FROM_PRODUCT(state, product) {
      // หาตำแหน่งของสินค้าในตะกร้าที่มี ID ซ้ำกับสินค้าที่ add เข้ามา
      let found = state.cart.find((item) => item.id == product.id); // item คือ ตัวแปรที่เก็บ cart ใน state ไว้ จะชื่ออะไรก็ได้
      if (found) {
        found.qty = found.qty + 1;
        found.total = found.qty * found.price;
      } else {
        state.cart.push(product);
      }
    },
  },
  actions: {
    itemFromProduct({ commit }, product) {
      commit("ITEM_FROM_PRODUCT", product);
    },
  },
});
