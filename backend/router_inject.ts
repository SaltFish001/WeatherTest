import { type IRouter } from "0http-bun/common";
const BASE_PATTERN = "/api";
export default (router: IRouter) => {
  router.get(BASE_PATTERN + "/test", async (_req) => {
    return new Response("Hello, world!");
  });
};
