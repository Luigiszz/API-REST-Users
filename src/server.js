import http from "node:http";
import { toJson } from "./middlewares/StreamBuffersToJson.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { routes } from "./middlewares/routes.js";
import { buildRoutepath } from "./utils/buildRoutePath.js";
import { extractQueryParameters } from "./utils/extractQueryParameters.js";

// Cria uma array de usuários que futuramente será utilizado para armazenar dados.

const database = new Database();
// Cria o servidor HTTP

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await toJson(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params} = routeParams.groups

    req.params = params;
    req.query = query ? extractQueryParameters(query) : {};
    


    route.handler(req, res, route);
  }
});

server.listen(3333);
