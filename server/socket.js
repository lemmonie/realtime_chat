// server/socket.js
import { Server } from "socket.io";
import console from "console";

/**
 * 綁定 Socket.io 到現有的 httpServer
 * 並設定「send_message → message_created」事件流
 */
export function attachSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`[socket] connected: ${socket.id}`);

    // 客戶端送來訊息
    socket.on("send_message", (payload) => {
      // payload 建議長這樣：{ text, senderId, conversationId }
      const msg = {
        id: cryptoRandomId(),             // 臨時用；未連 DB
        text: String(payload?.text || ""),
        senderId: payload?.senderId ?? "anon",
        conversationId: payload?.conversationId ?? "general",
        createdAt: new Date().toISOString(),
      };

      // 廣播給所有人（含自己）：message_created
      io.emit("message_created", msg);
      console.log("[socket] message_created:", msg);
    });

    socket.on("disconnect", (reason) => {
      console.log(`[socket] disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}

// 簡單產生隨機 id（未連 DB 前先用）
function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 10);
}
