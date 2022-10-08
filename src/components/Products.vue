<template>
  <div
    v-for="(product, index) in products.filter((e) =>
      category ? e.categoryId == category : e
    )"
    :class="$q.screen.width > 600 ? 'row' : 'row justify-center q-mt-md'"
  >
    <q-card v-if="product" style="width: 100%; max-width: 250px">
      <img :src="product.image" />

      <q-card-section>
        <div class="text-subtitle2 text-center">{{ product.name }}</div>
        <div class="text-center">
          <q-rating
            v-model="product.rating"
            size="2em"
            :max="5"
            color="primary"
            class="q-my-sm"
            readonly
          />
        </div>
        <div class="text-subtitle2 text-center">{{ product.price }} USD</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  name: "",
  setup() {
    return {};
  },
  props: ["products", "category"],
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
