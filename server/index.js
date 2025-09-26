// server/index.js
import http from "http";
import dotenv from "dotenv";
import console from "console";
import process from "process";
import { createHttpServer } from "./http.js";
import { attachSocket } from "./socket.js";

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

const app = createHttpServer();
const httpServer = http.createServer(app);

// 把 socket.io 掛到同一個 httpServer
attachSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`HTTP listening on http://localhost:${PORT}`);
});
