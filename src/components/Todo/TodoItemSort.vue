<template lang="pug">
  button.btn.btn-success(@click="onItemSort") Sort by {{ sortType }}
</template>
<script>
const typesOfSort = ['asc', 'desc', 'time'];

export default {
  name: 'TodoItemSort',
  props: {
    sortType: String,
  },
  methods: {
    onItemSort() {
      const indexOfSortType = typesOfSort.findIndex((value) => value === this.sortType);
      if ((Number(indexOfSortType) + 1) >= typesOfSort.length) {
        this.$emit('handleItemSort', typesOfSort[0]);
      } else {
        this.$emit('handleItemSort', typesOfSort[Number(indexOfSortType) + 1]);
      }
    },
  },
};
</script>
<style lang="sass">
</style>
