// server/socket.js
import { Server } from "socket.io";
import console from "console";

/**
 * itialize and attach Socket.IO to the given HTTP server
 */
export function attachSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("✅[socket] connected: ${socket.id}");

    // make a presetted soom, generate a chat room
    const room = "general";
    socket.join(room);

    /**
     * 1. sending message from user:
     *  payload structure: { text: string, senderId?: string, conversationId?: string }
     */
    socket.on("send_message", (payload) => {
      // 2. make a standard message for server + id and timestamp
      const msg = normalizeMessage(payload);

      // 3a. broadcast to all connected clients, inclusing myself
      io.emit("message_created", msg);
      console.log("[socket] message_created:", msg);

      // 3b. broadcast to all clients in one room (except myself)
      const targetRoom = payload?.conversationId || room;
      io.to(targetRoom).emit("message_created", msg);
      console.log("📣 message_created:", msg);


    });

    socket.on("disconnect", (reason) => {
      console.log("🛑 [socket] disconnected: ${socket.id} (${reason})");
    });
  });

  return io;
}

// function cryptoRandomId() {
//   return Math.random().toString(36).slice(2, 10);
// }

function normalizeMessage(payload) {
  return {
    id: Math.random().toString(36).slice(2, 10),
    text: String(payload?.text || ""),
    senderId: payload?.senderId ?? "anon",
    conversationId: payload?.conversationId ?? "general",
    createdAt: new Date().toISOString(),

  };
}
