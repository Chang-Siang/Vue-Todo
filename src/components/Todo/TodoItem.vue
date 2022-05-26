<template lang="pug">
div(@dblclick="onItemEdit()")
  .text-truncate(
    :class="{ completed: item.completed }",
    @click="onItemComplete()"
  )
    span {{ item.title }}
    button.close(@click="onItemDel()") ×
</template>
<script>
export default {
  name: 'TodoItem',
  props: {
    id: Number,
    title: String,
    completed: Boolean,
    isEditing: Boolean,
  },
  data() {
    return {
    };
  },
  methods: {
    onItemComplete() {
      const newItem = {
        id: this.item.id,
        title: this.item.title,
        completed: !this.item.completed,
        isEditing: this.item.isEditing,
      };
      this.$emit('handleItemUpdate', newItem);
    },
    onItemEdit() {
      this.$emit('handleItemEdit', this.item);
    },
    onItemDel() {
      this.$emit('handleItemDel', this.item);
    },
  },
  computed: {
    item() {
      return {
        id: this.id,
        title: this.title,
        completed: this.completed,
        isEditing: this.isEditing,
      };
    },
  },
};
</script>
<style lang="sass">
.completed
  text-decoration: line-through
</style>
