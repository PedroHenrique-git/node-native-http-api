import { createServer } from "node:http";
import { routes } from "./routes.js";

export const server = createServer((req, res) => {
  const { method, url } = req;

  const route = routes[method][url];

  if (route) {
    return route.handler(req, res);
  }

  return routes["404"].handler(req, res);
});
