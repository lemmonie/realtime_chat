// server/http.js
import express from "express";
import cors from "cors";
import process from "process";


export function createHttpServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // 最小測試：/ping
  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  // 健康檢查：/health
  app.get("/health", (req, res) => {
    res.json({
      ok: true,
      uptime: process.uptime(), // 伺服器開了多久（秒）
      env: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    });
  });

  // 你也可以放其他 REST 路由在這裡…

  return app;
}
