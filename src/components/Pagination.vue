<template>
  <div class="row text-center q-py-sm items-center">
    <div class="col">
      <q-icon name="chevron_left" size="2rem" @click="changePage('prev')" />
    </div>
    <div class="col">
      <p class="q-mb-none">{{ pageNum }}</p>
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
    return {};
  },

  methods: {
    changePage(direction) {
      this.$emit("submit", {
        value: direction,
      });
    },
  },
  mounted() {},
};
</script>
