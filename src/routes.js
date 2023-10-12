import { db } from "./db/index.js";
import { parseBody } from "./utils/index.js";
import { randomUUID } from "node:crypto";

export const routes = {
  GET: {
    "/": {
      handler(_, res) {
        res.writeHead(200, "Success", { "Content-type": "application/json" });

        return res.end(JSON.stringify(db));
      },
    },
  },
  POST: {
    "/": {
      async handler(req, res) {
        try {
          res.writeHead(200, "Success", { "Content-type": "application/json" });

          const { name, description } = await parseBody(req);

          const newTask = { id: randomUUID(), name, description };

          db.push(newTask);

          return res.end(JSON.stringify(newTask));
        } catch (err) {
          res.writeHead(500, "Internal Server Error", {
            "Content-type": "application/json",
          });

          return res.end(
            JSON.stringify({
              message: err?.message ?? "Internal Server Error",
            })
          );
        }
      },
    },
  },
  404: {
    handler(_, res) {
      res.writeHead(404, "Not found", { "Content-type": "application/json" });

      return res.end(JSON.stringify({ message: "Resource not found" }));
    },
  },
};
