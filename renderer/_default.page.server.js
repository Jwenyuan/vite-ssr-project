export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname"];

import { renderToString as renderToString_ } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import fetch from "node-fetch";
import antd from "ant-design-vue";
import { createApp } from "./app";
import logoUrl from "./logo.ico";

export async function onBeforeRender(pageContext) {
  const { urlPathname } = pageContext.routeParams;
  console.log("q==>> onBeforeRender urlPathname", urlPathname);

  try {
    // TODO: 根据路由信息获取接口数据
    const response = await fetch(
      "http://192.168.31.252/api/project/admin/history/new/1840556471694749697",
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
        pageProps: { data, msg, code },
      },
    };
  } catch (error) {
    console.error("node-fetch error:", error); // 处理错误
  }
}

async function render(pageContext) {
  console.log("q==>> render pageContext:", pageContext);
  const { Page, pageProps } = pageContext;
  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");
  const app = createApp(Page, pageProps, pageContext);

  const appHtml = await renderToString(app);

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "这是个页面标题";
  const desc = (documentProps && documentProps.description) || "这是个页面描述";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
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
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}

async function renderToString(app) {
  let err;
  app.use(antd);
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_;
  };
  const appHtml = await renderToString_(app);
  if (err) throw err;
  return appHtml;
}
