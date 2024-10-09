<template>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter /></li>
  </ul>
</template>

<script setup>
import Counter from "./Counter.vue";
import { onMounted } from "vue";

const props = defineProps({
  data: Object,
});

onMounted(() => {
  console.log("q==>> indexProps", props);
});
</script>
