import { Database } from "../database.js";
import { buildRoutepath } from "../utils/buildRoutePath.js";
import { randomUUID } from "node:crypto";
const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutepath("/users"),
    handler: (req, res) => {
      const { search } = req.query
      const data = database.select("users", search ? {
        name: search,
        email: search
      } : null);
      return res.end(JSON.stringify(data));
    },
  },
  {
    method: "POST",
    path: buildRoutepath("/users"),
    handler: (req, res) => {
      const { name, email, password } = req.body;

      const user = {
        id: randomUUID(),
        name: name,
        email: email,
        pass: password,
      };

      database.insert("users", user);

      return res
        .setHeader("Content-type", "application/json")
        .writeHead(202)
        .end("202 Accepted");
    },
  },
  {
    method: 'PUT',
    path: buildRoutepath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email, password } = req.body;

      database.edit('users', id, { name, email, password })
      res.writeHead('200').end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutepath("/users/:id"),
    handler: (req, res, route) => {
      const { id } = req.params
      
      database.delete("users", id);
      res.writeHead(204).end();
    },
  },
];
