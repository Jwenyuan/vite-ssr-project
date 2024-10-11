<template>
  <div class="content-box">
    <div class="list-box">
      <div class="item" v-for="item in currentList" :key="item.id">
        <div>{{ item.title }}</div>
        <img class="img" :src="item.image" alt="蘑菇头" />
      </div>
    </div>
    <Pagination
      :total="list.length"
      :pageSize="10"
      :current="current"
      @change="handleCurrentPageChange"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Pagination } from "ant-design-vue";

const props = defineProps({
  contentData: Array,
});
const list = ref([]);
const image = ref([
  "http://img1.baidu.com/it/u=2026906479,116698057&fm=253&app=138&f=JPEG?w=442&h=502",
  "http://img0.baidu.com/it/u=1708776865,1769042364&fm=253&app=138&f=JPEG?w=460&h=524",
  "http://img1.baidu.com/it/u=2026906479,116698057&fm=253&app=138&f=JPEG?w=442&h=502",
  "http://img0.baidu.com/it/u=2406733696,2429605921&fm=253&app=138&f=JPEG?w=470&h=535",
  "http://img0.baidu.com/it/u=2915483789,856292458&fm=253&app=138&f=JPEG?w=490&h=538",
  "http://img0.baidu.com/it/u=2915483789,856292458&fm=253&app=138&f=JPEG?w=490&h=538",
  "https://www.bugela.com/cjpic/frombd/1/253/1679367126/1309417844.jpg",
  "https://static.oneplus.cn/data/attachment/forum/201812/13/205523atluohvlhlv5bwt3.jpg",
  "https://q4.itc.cn/q_70/images03/20240207/acc0adf3d3af4cd0b5c837f2fa70b102.jpeg",
  "http://img0.baidu.com/it/u=3721348422,380460710&fm=253&app=138&f=JPEG?w=800&h=808",
  "http://img1.baidu.com/it/u=286697164,1013396042&fm=253&app=138&f=JPEG?w=800&h=800",
  "http://img0.baidu.com/it/u=3967317791,2171463452&fm=253&app=138&f=JPEG?w=800&h=800",
  "http://img2.baidu.com/it/u=2160164731,1007530242&fm=253&app=138&f=JPEG?w=475&h=475",
  "http://img0.baidu.com/it/u=2266676154,3020500022&fm=253&app=138&f=JPEG?w=475&h=475",
]);
const current = ref(1);
const currentList = ref(
  list.value.slice((current.value - 1) * 10, current.value * 10)
);

onMounted(() => {
  console.log("q==>> props:", props);
  for (let i = 0; i < 50; i++) {
    list.value.push({
      id: i,
      image: image.value[Math.floor(Math.random() * (image.value.length - 1))],
      title: `这是第${i + 1}条数据`,
    });
  }
  handleCurrentPageChange(1);
});

const handleCurrentPageChange = (page) => {
  current.value = page;
  currentList.value = list.value.slice((page - 1) * 10, page * 10);
};
</script>

<script>
export const getProjectJson =
  "http://192.168.31.252/api/project/admin/history/new/";
</script>

<style scoped>
.content-box {
  padding: 20px;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item {
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 10px;
  font-size: 24px;
  color: rgb(16, 54, 3);
  font-weight: bolder;
}
.img {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}
</style>
