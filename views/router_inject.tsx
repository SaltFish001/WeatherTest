import {
  renderToReadableStream,
  renderToPipeableStream,
} from "react-dom/server";
import App from "./App";
import path from "node:path";
import { exists } from "node:fs/promises";
import { type IRouter } from "0http-bun/common";
import { pipeline, Transform } from "node:stream";
import Mime from "mime";
const public_path = path.join(process.cwd(), "public");
const BASE_PATTERN = "/view";
export default (router: IRouter) => {
  router.get(BASE_PATTERN + "/", async (_req) => {
    const stream = await renderToReadableStream(<App />, {
      bootstrapModules: ["/view/client.js"],
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  });
  router.get(BASE_PATTERN + "\\/(\\w.+).(\\w+)", async (req) => {
    const url = new URL(req.url);
    const file_path = path.join(
      public_path,
      url.pathname.replace(BASE_PATTERN, "")
    );
    if (!(await exists(file_path)))
      return new Response("Not found", { status: 404 });
    const file_stream = Bun.file(file_path);
    return new Response(file_stream, {
      headers: { "Content-Type": Mime.getType(file_path) || "text/plain" },
    });
  });
  router.get("/", async (_req) => {
    // jump to view page
    return Response.redirect("/view");
  });
};
() => {};
