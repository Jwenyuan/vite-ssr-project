import { resolveRoute } from "vite-plugin-ssr/routing";

export default (pageContext) => {
  const urlPathname = pageContext.urlPathname;
  // const result = resolveRoute("/product/@id", urlPathname);

  // if (result.match) {
  //   result.routeParams.view = "overview";
  //   return result;
  // }
  console.log("q==>> index.page.route");
  return {
    routeParams: {
      urlPathname,
    },
    precedence: 0, // 路由优先级，优先已有的文件系统路由
  };
};
