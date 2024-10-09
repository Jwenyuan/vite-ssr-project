<template>
  <div class="content-box"></div>
</template>

<script setup>
import Counter from "./Counter.vue";
import { onMounted } from "vue";

const props = defineProps({
  contentData: Array,
});

onMounted(() => {
  console.log("q==>> indexProps", props);
});
</script>
