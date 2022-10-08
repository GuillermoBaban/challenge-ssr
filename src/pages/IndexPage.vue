<template>
  <q-page>
    <div v-if="!loading">
      <div class="row">
        <div class="col-6">
          <Categories @submit="categorySelected" />
        </div>
        <div class="col-6 text-right q-pa-sm">
          <q-btn color="primary" icon="search" @click="openDialogFilter" />
          <DialogFilter ref="DialogFilterRef" @submit="changeColor" />
        </div>
      </div>
      <div class="row">
        <div v-if="$q.screen.width > 600" class="col">
          <Filter />
        </div>
        <div class="col">
          <Products :products="products" :category="category" />
        </div>
      </div>
      <Pagination @submit="pagination" :pageNum="n" />
    </div>
    <div v-else class="absolute-center">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script>
import { usuCallProductsStore } from "stores/callProducts";
import Categories from "components/Categories.vue";
import Filter from "components/Filter.vue";
import Products from "components/Products.vue";
import Pagination from "components/Pagination.vue";
import DialogFilter from "components/dialogs/DialogFilter.vue";

export default {
  name: "IndexPage",
  setup() {
    const productStore = usuCallProductsStore();
    return {
      productStore,
    };
  },
  components: {
    Categories,
    Filter,
    Products,
    Pagination,
    DialogFilter,
  },
  props: {},
  data() {
    return {
      products: [],
      category: null,
      loading: true,
      n: 1,
      prev: 0,
      colors: [],
    };
  },
  computed: {},
  methods: {
    async callApis(n) {
      await this.productStore.fetchProducts(n).then((res) => {
        this.products = res.data;
      });
      this.products.forEach((product) => {
        if (this.colors.indexOf(product.color) == -1) {
          this.colors.push(product.color);
        }
      });
      this.loading = false;
    },

    categorySelected(e) {
      this.category = e.value;
    },

    pagination(e) {
      this.prev = this.n;
      if (e.name == "direction") {
        if (e.direction == "next") {
          this.n = this.n + 1;
        } else if (e.direction == "prev" && this.n > 1) {
          this.n = this.n - 1;
        }
      } else if (e.name == "page") {
        this.n = e.pageNum;
      }

      if (this.prev != this.n) {
        this.callApis(this.n);
        this.loading = true;
      }
    },

    changeColor(e) {
      console.log(e);
    },

    openDialogFilter() {
      this.$refs.DialogFilterRef.visible = true;
      this.$refs.DialogFilterRef.colors = this.colors;
    },
  },
  mounted() {
    this.callApis(this.n);
  },
};
</script>
