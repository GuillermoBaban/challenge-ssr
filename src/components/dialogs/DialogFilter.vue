<template>
  <q-dialog full-width full-height v-model="visible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h6">Price range</div>
        <div class="row q-gutter-sm">
          <div class="col">
            <div class="text-subtitle2 text-center">From</div>
            <q-input outlined type="number" prefix="$" />
          </div>
          <div class="col">
            <div class="text-subtitle2 text-center">To</div>
            <q-input outlined type="number" prefix="$" />
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
              @update:model-value="changeColor(color)"
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
        <q-btn color="primary" icon="mail" label="Search" v-close-popup />
        <q-btn color="primary" icon="mail" label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "DialogFilter",
  components: {},
  data() {
    return {
      visible: false,
      colors: [],
      colorSelected: null,
      rating: 0,
    };
  },
  methods: {
    changeColor(color) {
      console.log(this.colorSelected);
    },
  },
  mounted() {},
};
</script>
