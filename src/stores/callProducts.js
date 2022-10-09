import { defineStore } from "pinia";
import { api } from "boot/axios";

export const usuCallProductsStore = defineStore("products", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchProducts(e) {
      return await api.get(
        e.from_filter && e.from_filter != undefined
          ? `http://api.devtoolstech.in/ecommerce/products?${
              (e.color ? `color=${e.color}&` : "") +
              (e.rating ? `rating=${e.rating}` : "")
            }`
          : `http://api.devtoolstech.in/ecommerce/products?_page=${e}&_limit=17`
      );
    },
  },
});
