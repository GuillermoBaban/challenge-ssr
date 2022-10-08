<template>
  <div class="row text-center q-py-sm items-center">
    <div class="col">
      <q-icon name="chevron_left" size="2rem" @click="changePage('prev')" />
    </div>
    <div class="col">
      <q-select
        outlined
        v-model="pageNum"
        :options="options"
        @update:model-value="changePage('page', pageNum)"
        item-aligned
      />
    </div>
    <div class="col">
      <q-icon name="chevron_right" size="2rem" @click="changePage('next')" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  components: {},
  props: {
    pageNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    };
  },

  methods: {
    changePage(direction, pageNum) {
      this.$emit("submit", {
        name: direction == "next" || direction == "prev" ? "direction" : "page",
        direction,
        pageNum: pageNum,
      });
    },
  },
  mounted() {},
};
</script>
