import { defineStore } from "pinia";
import { api } from "boot/axios";

export const usuCallCategoriesStore = defineStore("categories", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchCategories() {
      return await api.get("http://api.devtoolstech.in/ecommerce/categories");
    },
  },
});
