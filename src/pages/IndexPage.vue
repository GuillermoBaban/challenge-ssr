<template>
  <q-page>
    <div v-if="!loading">
      <div class="row">
        <div class="col-6">
          <Categories @submit="categorySelected" />
        </div>
        <div class="col-6 text-right q-pa-sm">
          <q-btn color="primary" icon="search" @click="openDialogFilter" />
          <DialogFilter ref="DialogFilterRef" @submit="selectFilter" />
        </div>
      </div>
      <div class="row">
        <div v-if="$q.screen.width > 600" class="col">
          <Filter />
        </div>
        <div class="col">
          <Products
            :products="from_filter ? price_filter : products"
            :category="category"
          />
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
      price_filter: null,
      from_filter: false,
    };
  },
  computed: {},
  methods: {
    async callApis(n) {
      await this.productStore.fetchProducts(n).then((res) => {
        this.products = res.data;
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

    selectFilter(e) {
      this.callApis(e);
      this.loading = true;
      if (e.money_from > 0 || e.money_to > 0) this.from_filter = true;
      else this.from_filter = false;
      this.price_filter = this.products.filter((product) => {
        if (e.money_from > 0 || e.money_to > 0) {
          console.log(e.money_from, e.money_to);
          return product.price >= e.money_from || product.price <= e.money_to;
        }
      });
    },

    openDialogFilter() {
      this.$refs.DialogFilterRef.visible = true;
    },
  },
  mounted() {
    this.callApis(this.n);
  },
};
</script>
