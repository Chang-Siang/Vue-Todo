<template>
  <button v-on:click="onItemSort">
    {{ sortType }}
  </button>
</template>
<script>
const typesOfSort = ["asc", "desc", "time"];

export default {
  name: "TodoItemSprt",
  props: {
    sortType: String,
  },
  methods: {
    onItemSort() {
      let indexOfSortType = typesOfSort.findIndex((value) => value === this.sortType);
      if ((Number(indexOfSortType)) >= 2) {
        this.$emit("handleItemSort", "asc");
      } else {
        this.$emit("handleItemSort", typesOfSort[indexOfSortType + 1]);
      }
    },
  },
};
</script>
<style lang="sass">
</style>
