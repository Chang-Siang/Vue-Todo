<template lang="pug">
  #app
    Todo
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'glyphicons-only-bootstrap/css/bootstrap.min.css';
import Todo from './components/Todo/Todo';

export default {
  name: 'App',
  components: {
    Todo,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 10px;
}
</style>
