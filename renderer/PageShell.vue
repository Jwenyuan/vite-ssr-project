<template>
  <div class="page-shell">
    <div class="header">
      <div>
        <a href="/" class="logo">
          <img
            src="https://avatars.githubusercontent.com/u/33242796?v=4"
            height="124"
            width="124"
            alt="logo"
          />
        </a>
        <div class="corporation-name">蘑菇头集团</div>
        <div class="breadcrumb">
          <Breadcrumb separator=">">
            <template v-for="(item, index) in props.breadcrumb" :key="index">
              <BreadcrumbItem>
                <a v-if="item?.href" :href="item.href"> {{ item.name }}</a>
                <template v-else>{{ item.name }}</template>
              </BreadcrumbItem>
            </template>
          </Breadcrumb>
        </div>
      </div>
      <div class="navigation">
        <Link href="/">Home</Link>
        <Link href="/about.html">About</Link>
      </div>
    </div>
    <div class="content"><slot /></div>
    <footer class="footer">这是个尾</footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Breadcrumb, BreadcrumbItem } from "ant-design-vue";
import Link from "@src/components/Link/index.vue";
import { usePageContext } from "@renderer/usePageContext";

const props = defineProps({
  headerData: Array,
  footerData: Array,
  breadcrumb: Array,
});

const pageContext = usePageContext();

onMounted(() => {
  console.log("q==>> pageShell mounted", pageContext, props.breadcrumb);
});
</script>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  height: 250px;
  background: #12b1ac;
  display: flex;
  padding: 20px;
  align-items: center;
  position: relative;
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
  margin-left: 30px;
}
.corporation-name {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.breadcrumb {
  position: absolute;
  bottom: 20px;
  left: 20px;
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
