import http from "node:http";
import { Transform } from "node:stream";

let buffers = [];
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(`Método: ${method}\nURL: ${url}`)
  if (method === "POST") {
    for await (const chunk of req) {
      console.log(chunk.toString());
      buffers.push(chunk);
    }
    const fullStreamContent = Buffer.concat(buffers).toString();
    return res.end(fullStreamContent);
  }

  if (method === "GET") {
    const fullStreamContent = Buffer.concat(buffers).toString();
    return res.end(fullStreamContent);
  }
});

server.listen(3335);
