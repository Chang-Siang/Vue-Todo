<template>
  <div class="input-group">
    <input
      type="text"
      autofocus
      autocomplete="off"
      class="form-control"
      v-model="item.title"
      v-on:keydown.enter="onItemUpdate"
    />
  </div>
</template>
<script>
export default {
  name: "TodoEditForm",
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
    onItemUpdate() {
      if (this.item.title.length > 0) {
        this.item.isEditing = false;
        this.$emit("handleItemUpdate", this.item);
      }
    },
  },
};
</script>
<style lang="sass">
</style>