const express = require("express"); // ask for the processor help me to deal with the router
const http = require("http"); // node.js's http in build model
const { Server } = require("socket.io"); // making it to be able to put on http server anf doing real time both way communication
const app = express(); // all the http request processor

// making a port that the https and socket.io could be in the same server
const server = http.createServer(app);

// tie the socket io on the new server
const io = new Server(server);
const helo = 0;

// make a check in the http router is normal or not
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// listening to the connection, when people online/offlne you will see the log
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// let the http.Server (including express and socket.io connect on port 3000)
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
