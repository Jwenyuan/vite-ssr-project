<template>
  <h1>About</h1>
  <div v-if="bool">11111</div>
  <div v-else>2222</div>
  <div v-for="item in list" :key="item">{{ item }}</div>
  <button @click="handleBtnClick">点我</button>
</template>

<script setup>
import { ref } from "vue";
import { usePageContext } from "@renderer/usePageContext";

const bool = ref(true);
const list = ref([1, 2, 3]);
const pageContext = usePageContext();

const handleBtnClick = () => {
  console.log("q==>> 点击", pageContext);
  bool.value = !bool.value;
  // fetch("/");
};
</script>

<script>
export const documentProps = {
  title: "About",
  description: "About page",
};
</script>

<style scoped lang="scss">
code {
  font-family: monospace;
  background-color: #eaeaea;
  padding: 3px 5px;
  border-radius: 4px;
}
</style>
