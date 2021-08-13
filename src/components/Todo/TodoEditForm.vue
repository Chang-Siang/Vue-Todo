<template lang="pug">
.input-group
  input.form-control(
    type="text",
    autofocus,
    autocomplete="off",
    v-model="item.title",
    @keydown.enter="onItemUpdate"
  )
</template>
<script>
export default {
  name: 'TodoEditForm',
  props: {
    id: Number,
    title: String,
    completed: Boolean,
    isEditing: Boolean,
  },
  data() {
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
    onItemUpdate() {
      if (this.item.title.trim()) {
        this.item.isEditing = false;
        this.$emit('handleItemUpdate', this.item);
      }
    },
  },
};
</script>
<style lang="sass">
</style>
