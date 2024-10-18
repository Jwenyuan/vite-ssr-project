import { createSSRApp, h } from "vue";
import antd from "ant-design-vue";
import PageShell from "./PageShell.vue";
import { setPageContext } from "./usePageContext";

export { createApp };

function createApp(Page, pageProps, pageContext) {
  const { data = {}, breadcrumb = [] } = pageProps || {};
  const { headerData = "[]", footerData = "[]", contentData = "[]" } = data;
  console.log("q==>> breadcrumb", breadcrumb);
  const PageWithLayout = {
    render() {
      return h(
        PageShell,
        {
          headerData: JSON.parse(headerData),
          footerData: JSON.parse(footerData),
          breadcrumb,
        },
        {
          default() {
            return h(Page, { contentData: JSON.parse(contentData) });
          },
        }
      );
    },
  };

  const app = createSSRApp(PageWithLayout);

  app.use(antd);

  // We make pageContext available from any Vue component
  setPageContext(app, pageContext);

  return app;
}
