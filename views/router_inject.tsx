import { renderToReadableStream } from "react-dom/server";
import App from "./index";

import { type IRouter } from "0http-bun/common";
const BASE_PATTERN = "/view";
export default (router: IRouter) => {
  router.get("/", async (_req) => {
    // jump to view page
    return Response.redirect("/view");
  });
  router.get(BASE_PATTERN + "/", async (_req) => {
    const stream = await renderToReadableStream(<App name="World" />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  });
};
