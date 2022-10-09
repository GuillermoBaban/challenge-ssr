import { defineStore } from "pinia";
import { api } from "boot/axios";

export const usuCallColorsStore = defineStore("colors", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchColors() {
      return await api.get("http://api.devtoolstech.in/ecommerce/products");
    },
  },
});
