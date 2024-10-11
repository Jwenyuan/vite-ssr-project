<template>
  <h1>About</h1>
  <p>Example of app using <code>vite-plugin-ssr</code>.</p>
  <div v-if="bool">11111</div>
  <div v-else>2222</div>
  <div v-for="item in list" :key="item">{{ item }}</div>
</template>

<script setup>
import { ref } from "vue";

const bool = ref(true);
const list = ref([1, 2, 3]);
</script>
<style scoped lang="scss">
code {
  font-family: monospace;
  background-color: #eaeaea;
  padding: 3px 5px;
  border-radius: 4px;
}
</style>
