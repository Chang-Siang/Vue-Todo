<template lang="pug">
.input-group
  input.form-control(
    type="text",
    autofocus,
    autocomplete="off",
    v-model="newInput",
    @keydown.enter="onItemUpdate()"
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
      newInput: this.title,
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
  computed: {
    item() {
      return {
        id: this.id,
        title: this.newInput,
        completed: this.completed,
        isEditing: this.isEditing,
      };
    },
  },
};
</script>
<style lang="sass">
</style>
