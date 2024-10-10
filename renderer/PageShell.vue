<template>
  <div class="page-shell">
    <div class="header">
      <div class="navigation">
        是个头啊
        <a href="/" class="logo">
          <img
            src="https://avatars.githubusercontent.com/u/33242796?v=4"
            height="64"
            width="64"
            alt="logo"
          />
        </a>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
    <div class="content"><slot /></div>
    <footer class="footer">这是个尾</footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Link from "../src/components/Link/index.vue";

const props = defineProps({
  headerData: Array,
  footerData: Array,
});

onMounted(() => {
  console.log("q==>> pageShell mounted", props);
});
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
</style>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  height: 250px;
  background: #12b1ac;
}
.content {
  flex: 1;
  padding: 20px;
  border-left: 2px solid #eee;
  padding-bottom: 50px;
}
.navigation {
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8em;
  color: #eee;
  font-size: 20px;
}
.logo {
  margin-top: 20px;
}
.footer {
  height: 150px;
  background-color: #b9216d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eee;
  font-size: 20px;
}
</style>
