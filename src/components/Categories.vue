<template>
  <div
    v-if="$q.screen.width > 600"
    class="col q-pt-lg"
    v-for="category in categories"
  >
    <q-btn
      color="primary"
      @click="categorySelected(category.id)"
      :label="category.name"
    />
  </div>
  <div class="q-pa-sm" v-else>
    <q-btn color="primary" icon="menu">
      <q-menu>
        <q-list style="min-width: 114px">
          <q-item v-for="category in categories" clickable v-close-popup>
            <q-item-section @click="categorySelected(category.id)"
              >{{ category.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script>
import { usuCallCategoriesStore } from "stores/callCategorys";
export default {
  name: "Categories",
  setup() {
    const categoriesStore = usuCallCategoriesStore();
    return {
      categoriesStore,
    };
  },
  components: {},
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    async callCategories() {
      await this.categoriesStore.fetchCategories().then((res) => {
        this.categories = res.data;
      });
    },

    categorySelected(id) {
      this.$emit("submit", {
        value: id,
      });
    },
  },
  mounted() {
    this.callCategories();
  },
};
</script>
