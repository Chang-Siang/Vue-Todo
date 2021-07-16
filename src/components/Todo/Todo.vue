<template>
  <div class="todo">
    <div class="header">
      <h1>Todo</h1>
    </div>
    <hr />
    <div>
      <TodoInputForm @handleItemAdd="handleItemAdd" />
    </div>
    <hr />
    <TodoItemSort :sortType="sortType" @handleItemSort="handleItemSort" />
    <hr />
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">An unexpected error has occurred.</div>
      <ul>
        <li v-for="item in items" :key="item.id">
          <div v-if="item.isEditing">
            <TodoEditForm
              v-bind="item"
              :key="item.id"
              @handleItemUpdate="handleItemUpdate"
            />
          </div>
          <div v-else>
            <TodoItem
              v-bind="item"
              :key="item.id"
              @handleItemDel="handleItemDel"
              @handleItemEdit="handleItemEdit"
              @handleItemUpdate="handleItemUpdate"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoInputForm from "./TodoInputForm";
import TodoEditForm from "./TodoEditForm";
import TodoItemSort from "./TodoItemSort.vue";

// const ajaxUrl = "https://my-json-server.typicode.com/Chang-Siang/demo/";
const ajaxUrl = "http://127.0.0.1:3020/";

export default {
  name: "Todo",
  components: {
    TodoItem,
    TodoInputForm,
    TodoEditForm,
    TodoItemSort,
  },
  data: function () {
    return {
      loading: false,
      error: false,
      items: [],
      sortType: "asc",
    };
  },
  methods: {
    ajaxServerItemsLoad() {
      fetch(ajaxUrl + "posts", {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          const items = data.map((item) => {
            return Object.assign({}, item, { isEditing: false });
          });
          //載入資料，重新渲染並關閉讀取狀態
          this.items = items;
          this.loading = false;
        })
        .catch((error) => {
          //顯示錯誤訊息，並關閉讀取狀態
          console.error(error);
          this.error = true;
          this.loading = false;
        });
    },
    ajaxServerItemAdd(item) {
      const { id, title, completed } = item;
      const payload = { id, title, completed };

      fetch(ajaxUrl + "posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log("Successfully added:", data);
        })
        .catch((error) => {
          console.error("error:", error);
        });
    },
    ajaxServerItemUpdate(item) {
      const { id, title, completed } = item;
      const payload = { id, title, completed };

      //作POST
      fetch(ajaxUrl + `posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log("Successfully update:", data);
        })
        .catch((error) => {
          console.error("error:", error);
        });
    },
    ajaxServerItemDelete(item) {
      const { id } = item;

      fetch(ajaxUrl + `posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log("Successfully deleted", data);
        })
        .catch((error) => {
          console.error("error:", error);
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
      if (sortType === "asc") {
        this.items = this.items.sort((a, b) =>
          a.title.localeCompare(b.title, "zh-Hans-TW-u-co-stroke")
        );
      }
      if (sortType === "desc") {
        this.items = this.items.sort((a, b) =>
          b.title.localeCompare(a.title, "zh-Hans-TW-u-co-stroke")
        );
      }
      if (sortType === "time") {
        this.items = this.items.sort((a, b) => b.id - a.id);
      }
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    this.loading = true;
    this.ajaxServerItemsLoad();
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
</style>
