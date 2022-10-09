<template>
  <q-dialog full-width full-height v-model="visible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h6">Price range</div>
        <div class="row q-gutter-sm">
          <div class="col">
            <div class="text-subtitle2 text-center">From</div>
            <q-input outlined type="number" prefix="$" v-model="money_from" />
          </div>
          <div class="col">
            <div class="text-subtitle2 text-center">To</div>
            <q-input outlined type="number" prefix="$" v-model="money_to" />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-center text-h6">Color</div>
        <div class="row">
          <div class="col-6 text-center" v-for="color in colors">
            <q-radio
              left-label
              v-model="colorSelected"
              :val="color"
              :label="color"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-center text-h6">Average rating</div>
        <div class="row">
          <div class="col-12 text-center">
            <q-rating
              v-model="rating"
              size="2em"
              :max="5"
              color="primary"
              class="q-my-sm"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="bg-white justify-around">
        <q-btn color="primary" icon="close" label="Close" v-close-popup />
        <q-btn
          color="primary"
          icon="mail"
          label="Search"
          @click="search"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { usuCallColorsStore } from "stores/callColors";
export default {
  name: "DialogFilter",
  setup() {
    const colorsStore = usuCallColorsStore();
    return {
      colorsStore,
    };
  },
  components: {},
  data() {
    return {
      visible: false,
      colors: [],
      colorSelected: null,
      rating: 0,
      money_from: 0,
      money_to: 0,
    };
  },
  methods: {
    search() {
      this.$emit("submit", {
        color: this.colorSelected,
        rating: this.rating,
        money_from: this.money_from,
        money_to: this.money_to,
        from_filter: true,
      });
    },

    async callApis() {
      let allProducts = [];
      await this.colorsStore.fetchColors().then((res) => {
        allProducts = res.data;
      });
      allProducts.forEach((product) => {
        if (this.colors.indexOf(product.color) == -1) {
          this.colors.push(product.color);
        }
      });
      this.loading = false;
    },
  },
  mounted() {
    this.callApis();
  },
};
</script>
