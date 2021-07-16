<template>
  <div class="input-group">
    <input
      type="text"
      autofocus
      autocomplete="off"
      class="form-control"
      v-model="newInput"
      v-on:keydown.enter="onItemAdd"
    />
  </div>
</template>
<script>
export default {
  name: "TodoInputForm",
  data: function () {
    return {
      newInput: "",
    };
  },
  methods: {
    onItemAdd() {
      if (this.newInput.length > 0) {
        this.$emit("handleItemAdd", {
          id: +new Date(),
          title: this.newInput,
          isCompleted: false,
          isEditing: false,
        });
        this.newInput = "";
      }
    },
  },
};
</script>
<style lang="sass">
</style>