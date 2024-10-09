# [VSP](https://github.com/Jwenyuan/vite-ssr-project.git)

## 目录结构

```js
├── README.md
├── package-lock.json
├── package.json
├── pages // 路由页面
│   ├── about // about页面
│   │   └── index.page.vue
│   └── index // 首页
│       ├── Counter.vue
│       └── index.page.vue
├── renderer // 渲染控制
│   ├── Link.vue
│   ├── PageShell.vue
│   ├──_default.page.client.js
│   ├──_default.page.server.js
│   ├──_error.page.vue
│   ├── app.js
│   ├── logo.svg
│   └── usePageContext.js
├── server // 服务端
│   ├── index.js
│   └── root.js
└── vite.config.js
```

## 路由

```text
 /pages/index.page.vue        /
 /pages/about.page.vue        /about
 /pages/{id}.page.vue         /{id}
 ```

- page.js: 在浏览器和 Node.js 中运行
- page.client.js: 只在浏览器中运行
- page.server.js: 只在 Node.js 中运行
- page.route.js: 定义页面的路由字符串或路由函数

## 页面

## 代码
