<template>
  <div class="" v-on:dblclick="onItemEdit">
    <div
      :class="{ completed: item.completed }"
      class="text-truncate"
      v-on:click="onItemComplete"
    >
      {{ item.title }}
      <button class="close" v-on:click="onItemDel">×</button>
    </div>
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