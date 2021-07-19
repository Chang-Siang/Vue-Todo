<template lang="pug">
div(@dblclick="onItemEdit")
  .text-truncate(:class="{ completed: item.completed }", @click="onItemComplete") {{ item.title }}
    button.close(@click="onItemDel") ×
</template>
<script>
export default {
  name: "TodoItem",
  props: {
    id: Number,
    title: String,
    completed: Boolean,
    isEditing: Boolean,
  },
  data: function () {
    return {
      item: {
        id: this.id,
        title: this.title,
        completed: this.completed,
        isEditing: this.isEditing,
      },
    };
  },
  methods: {
    onItemComplete() {
      this.item.completed = !this.item.completed;
      this.$emit("handleItemUpdate", this.item);
    },
    onItemEdit() {
      this.$emit("handleItemEdit", this.item);
    },
    onItemDel() {
      this.$emit("handleItemDel", this.item);
    },
  },
};
</script>
<style lang="sass">
.completed
  text-decoration: line-through
</style>