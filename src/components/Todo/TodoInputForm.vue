<template lang="pug">
.input-group
  input.form-control(
    type="text",
    autofocus,
    autocomplete="off",
    v-model="newInput",
    @keydown.enter="onItemAdd()"
  )
</template>
<script>
export default {
  name: 'TodoInputForm',
  data() {
    return {
      newInput: '',
    };
  },
  methods: {
    getDateNow() {
      return Date.now();
    },
    onItemAdd() {
      if (this.newInput.trim()) {
        this.$emit('handleItemAdd', {
          id: this.getDateNow(),
          title: this.newInput,
          isCompleted: false,
          isEditing: false,
        });
        this.newInput = '';
      }
    },
  },
};
</script>
<style lang="sass">
</style>
