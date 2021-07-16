<template>
  <div v-on:dblclick="onItemEdit">
    <span :class="{ completed: item.completed }" v-on:click="onItemComplete">
      {{ item.title }}
    </span>
    <button v-on:click="onItemDel">Done</button>
  </div>
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