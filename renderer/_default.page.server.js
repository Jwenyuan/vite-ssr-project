export { render };
export const passToClient = ["pageProps", "urlPathname"];

import { renderToString as renderToString_ } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import fetch from "node-fetch";
import { createApp } from "./app";
import logoUrl from "@public/logo.ico";

const getNavList = async () => {
  const response = await fetch(
    `http://192.168.31.252/api/project/admin/project/navigation/list?projectId=${
      import.meta.env.VITE_PROJECT_ID
    }&type=NAVIGATION`
  );
};

const navList = [
  { url: "/", breadcrumb: [{ name: "首页" }] },
  {
    url: "/about",
    breadcrumb: [{ name: "关于" }],
  },
  ...(() => {
    const list = [];
    for (let i = 1; i <= 50; i++) {
      list.push({
        url: `/product/${i}`,
        breadcrumb: [{ href: "/", name: "首页" }, { name: `产品${i}` }],
      });
    }
    return list;
  })(),
];

export async function onBeforeRender(pageContext) {
  const { urlOriginal } = pageContext;

  const breadcrumb =
    navList.find((item) => item.url === String(urlOriginal))?.breadcrumb || [];

  console.log("q==>> onBeforeRender", urlOriginal, breadcrumb);
  if (!pageContext.exports.getProjectJson)
    return {
      pageContext: {
        pageProps: {
          breadcrumb,
        },
      },
    };

  try {
    // TODO: 根据路由信息获取接口数据
    const response = await fetch(
      pageContext.exports.getProjectJson + import.meta.env.VITE_PROJECT_ID,
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiJCZWFyZXIgdG9rZW46bG9naW5fdG9rZW5zOjE6MTphY2Nlc3NfdG9rZW46YTVkYThmMTQtNjg0YS00YjA5LWEzYzctMGQwOGQxMDk3ZjU3IiwicmVmcmVzaF90b2tlbiI6IkJlYXJlciB0b2tlbjpsb2dpbl90b2tlbnM6MToxOnJlZnJlc2hfdG9rZW46WW1haEV0OGtqYndjb2ZOSUg2NlhJUlNZNWp1aW5uT0dTd19aNHItZ0plOFRIODVtOWx5VTl2MjhaUEdjTFlGTTJScjZodjRXSURwQ2F2UlNBS0p2Wk1RYU9aSDhxVVRDUlJveGxGdmdSbGJwYVFhQzB6VkMxSEwxMzA5akNsRTQiLCJhY2NvdW50X3R5cGUiOiJhZG1pbiIsInVzZXJfdHlwZSI6IjAwIiwidXNlcl9pZCI6MSwidXNlcl9uYW1lIjoiYWRtaW4iLCJpc19sZXNzb3IiOiJZIiwiZW50ZXJwcmlzZV9pZCI6MSwiZW50ZXJwcmlzZV9uYW1lIjoiYWRtaW5pc3RyYXRvciIsInNvdXJjZV9uYW1lIjoic2xhdmUifQ.LBBtEPlr-S1NvAJDuaoqE4utBwnWmV6CGhsBjTrArFnS4jrI7QWFeD9BueOIgG_0t0XiZ6lipqTgO-2Wb1zf2w",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `fetch() failed: ${response.status} ${response.statusText}`
      );
    }

    // 注入页面数据
    let { data, msg, code } = await response.json();
    return {
      pageContext: {
        pageProps: {
          data,
          msg,
          code,
          breadcrumb,
        },
      },
    };
  } catch (error) {
    console.error("node-fetch error:", error); // 处理错误
  }
}

async function render(pageContext) {
  console.log("q==>> render");
  const { Page, pageProps, exports } = pageContext;

  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");
  const app = createApp(Page, pageProps, pageContext);

  const appHtml = await renderToString(app);

  const { documentProps } = exports;
  const title = (documentProps && documentProps.title) || "这是个页面标题";
  const desc = (documentProps && documentProps.description) || "这是个页面描述";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <link rel="stylesheet" href="/base.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
}

async function renderToString(app) {
  let err;

  // renderToString错误抛出
  app.config.errorHandler = (err_) => {
    err = err_;
  };
  const appHtml = await renderToString_(app);
  if (err) throw err;
  return appHtml;
}

export async function prerender() {
  console.log("q==>> prerender");
  // TODO: 请求导航生成动态页面预渲染
  return navList.map((item) => item.url);

  // 优化：模板数据渲染前统一请求数据渲染不走beforeRenderHook
  // return [{url: xx, pageContext: {pageProps: {}}}]
}

export function onBeforePrerender(pageContext) {
  console.log("q==>> onBeforePrerender pageContext:", pageContext);
}
