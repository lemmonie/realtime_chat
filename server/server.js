import express from "express"; // ask for the processor help me to deal with the router
import http from "http";       // node.js's http in build model
import { Server } from "socket.io" // making it to be able to put on http server anf doing real time both way communication
import cors from "cors" // all the http request processor
import dotenv from "dotenv";  // load the .env file
import { uptime } from "process";
import console from "console";
import process from "process";

dotenv.config();            // execute the config

const app = express();
app.use(cors());            // use the cors to avoid the cors problem 
app.use(express.json());    // let the express to support json format 

// health check
app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: uptime()});
});


//testing API
app.get("/ping", (req, res) => {
  res.send("pong");
});

// build https server and socket.io server
const server = http.createServer(app); // create the http server with express app
const io = new Server(server, {       // create the socket.io server and bind it to the http server
  cors: {                             // allow the cors from the front end
    origin: "*",     // only allow get and post method
  },
});

io.on("connection", (socket) => { // when the client connect to the server
  console.log("User connected: ${socket.id}");
  
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);  // when the client join the room
  });
});

const PORT = process.env.PORT || 3000; // get the port from the .env file or use 3001 as default
server.listen(PORT, () => {             // start the server
  console.log(`Server is running on port ${PORT}`);
}); 
