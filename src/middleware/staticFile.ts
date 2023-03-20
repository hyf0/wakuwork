import path from "node:path";
import fs from "node:fs";

import mime from "mime";

import type { MiddlewareCreator } from "./common.js";

const staticFile: MiddlewareCreator = (config) => {
  const dir = path.resolve(config.prdServer?.dir || ".");
  const publicPath = config.files?.public || "public";
  return async (req, res, next) => {
    if (req.url) {
      const fname = path.join(dir, publicPath, req.url);
      const stat = fs.statSync(fname, { throwIfNoEntry: false });
      if (stat?.isFile()) {
        res.setHeader("Content-Length", stat.size);
        res.setHeader(
          "Content-Type",
          mime.getType(path.extname(fname)) || "application/octet-stream"
        );
        fs.createReadStream(fname).pipe(res);
        return;
      }
    }
    await next();
  };
};

export default staticFile;