import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import path from "node:path";
const outputPath = path.join(process.cwd(), "/public/antd.min.css");

const css = extractStyle();

fs.writeFileSync(outputPath, css);

await Bun.build({
  entrypoints: ["client.tsx"],
  outdir: "public",
  format: "esm",
  minify: true,
  target: "browser",
  sourcemap: "inline",
  experimentalCss: true,
});
