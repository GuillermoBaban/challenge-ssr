import { defineStore } from "pinia";
import { api } from "boot/axios";

export const usuCallProductsStore = defineStore("products", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchProducts(e) {
      return await api.get(
        `http://api.devtoolstech.in/ecommerce/products?_page=${e}&_limit=17`
      );
    },
  },
});
