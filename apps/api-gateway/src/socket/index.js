const { Server } = require("socket.io");

function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const broadcastVisitorCount = () => {
    io.emit("visitors:count", io.engine.clientsCount);
  };

  io.on("connection", (socket) => {
    console.log(`socket connected: ${socket.id} (total: ${io.engine.clientsCount})`);

    socket.emit("visitors:count", io.engine.clientsCount);
    broadcastVisitorCount();

    socket.on("disconnect", (reason) => {
      console.log(`socket disconnected: ${socket.id} (${reason})`);
      broadcastVisitorCount();
    });
  });

  return io;
}

module.exports = { initSocket };
