<template lang="pug">
.todo.container
  .row
    .header.col
      h1.text-center.white-text.font-weight-bold Todo
  hr
  .row
    .col
      TodoInputForm(@handleItemAdd="handleItemAdd")
  hr
  .row
    .col
      TodoItemSort(:sortType="sortType", @handleItemSort="handleItemSort")
  hr
  .row
    .col
      div(v-if="isError") An unexpected error has occurred.
      div(v-else-if="isLoading") isLoading...
      ul.list-group
        li.list-group-item.list-group-item-action(
          v-for="item in items",
          :key="item.id"
        )
          div(v-if="item.isEditing")
            TodoEditForm(
              v-bind="item",
              :key="item.id",
              @handleItemUpdate="handleItemUpdate"
            )
          div(v-else)
            TodoItem(
              v-bind="item",
              :key="item.id",
              @handleItemDel="handleItemDel",
              @handleItemEdit="handleItemEdit",
              @handleItemUpdate="handleItemUpdate"
            )
  hr
  .col.alert.alert-success(role="alert") click to complete, double-click to edit.
</template>

<script>
import fetch from 'cross-fetch';
import TodoItem from './TodoItem';
import TodoInputForm from './TodoInputForm';
import TodoEditForm from './TodoEditForm';
import TodoItemSort from './TodoItemSort';

const ajaxUrl = 'https://my-json-server.typicode.com/Chang-Siang/demo/';

export default {
  name: 'Todo',
  components: {
    TodoItem,
    TodoInputForm,
    TodoEditForm,
    TodoItemSort,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      items: [],
      sortType: 'asc',
    };
  },
  mounted() {
    this.isLoading = true;
    this.ajaxServerItemsLoad();
  },
  methods: {
    ajaxServerItemsLoad() {
      fetch(`${ajaxUrl}posts`, {
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          const items = data.map((item) => ({ ...item, isEditing: false }));
          // 載入資料，重新渲染並關閉讀取狀態
          this.items = items;
          this.isLoading = false;
        })
        .catch((error) => {
          // 顯示錯誤訊息，並關閉讀取狀態
          console.error(error);
          this.isError = true;
          this.isLoading = false;
        });
    },
    ajaxServerItemAdd(item) {
      const { id, title, completed } = item;
      const payload = { id, title, completed };

      fetch(`${ajaxUrl}posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log('Successfully added:', data);
        })
        .catch((error) => {
          console.error('error:', error);
        });
    },
    ajaxServerItemUpdate(item) {
      const { id, title, completed } = item;
      const payload = { id, title, completed };

      fetch(`${ajaxUrl}posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log('Successfully update:', data);
        })
        .catch((error) => {
          console.error('error:', error);
        });
    },
    ajaxServerItemDelete(item) {
      const { id } = item;

      fetch(`${ajaxUrl}posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log('Successfully deleted', data);
        })
        .catch((error) => {
          console.error('error:', error);
        });
    },
    handleItemAdd(item) {
      this.ajaxServerItemAdd(item);
      this.items.push(item);
    },
    handleItemEdit(item) {
      const index = this.items.findIndex((current) => current.id === item.id);
      this.items[index].isEditing = !this.items[index].isEditing;
    },
    handleItemUpdate(item) {
      this.ajaxServerItemUpdate(item);
      const index = this.items.findIndex((current) => current.id === item.id);
      this.$set(this.items, index, item);
    },
    handleItemDel(item) {
      this.ajaxServerItemDelete(item);

      const index = this.items.findIndex((current) => current.id === item.id);
      this.items.splice(index, 1);
    },
    handleItemSort(sortType) {
      this.sortType = sortType;
      if (sortType === 'asc') {
        this.items = this.items.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-TW-u-co-stroke'));
      }
      if (sortType === 'desc') {
        this.items = this.items.sort((a, b) => b.title.localeCompare(a.title, 'zh-Hans-TW-u-co-stroke'));
      }
      if (sortType === 'time') {
        this.items = this.items.sort((a, b) => b.id - a.id);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
