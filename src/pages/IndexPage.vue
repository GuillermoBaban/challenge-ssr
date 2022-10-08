<template>
  <q-page>
    <div v-if="!loading">
      <div class="row text-center">
        <Categories @submit="categorySelected" />
      </div>
      <div class="row">
        <div v-if="$q.screen.width > 600" class="col">
          <!-- <Filter /> -->
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
import { defineComponent } from "vue";
import { usuCallProductsStore } from "stores/callProducts";
import Categories from "components/Categories.vue";
import Filter from "components/Filter.vue";
import Products from "components/Products.vue";
import Pagination from "components/Pagination.vue";

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
  },
  props: {},
  data() {
    return {
      products: [],
      category: null,
      loading: true,
      n: 1,
      prev: 0,
    };
  },
  computed: {},
  methods: {
    async callApis(n) {
      await this.productStore.fetchProducts(n).then((res) => {
        this.products = res.data;
        //250
      });
      this.loading = false;
    },

    categorySelected(e) {
      this.category = e.value;
    },

    pagination(e) {
      this.prev = this.n;
      if (e.value == "next") {
        this.n = this.n + 1;
      } else if (e.value == "prev" && this.n > 1) {
        this.n = this.n - 1;
      }
      if (this.prev != this.n) {
        this.callApis(this.n);
        this.loading = true;
      }
    },
  },
  mounted() {
    this.callApis(this.n);
  },
};
</script>
