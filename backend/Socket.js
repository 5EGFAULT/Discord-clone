const Channel = require("./Models/Channel");

module.exports = (io) => {
  //   console.log("IO: ", io);
  io.on("connect", (socket) => {
    // socket.join("channel-" + id);
    socket.on("newmessage", async (message) => {
      console.log(message);
      Channel.InsertMessage(message.user_id, message.channel_id, message.text)
        .then((resolve) => {
          if (resolve.err == null)
            // io.emit("createmessage", { data: resolve.data, err: resolve.err });
            // io.emit("createmessage", { data: resolve.data, err: resolve.err });
            io.to("channel-" + message.channel_id).emit("createmessage", {
              data: resolve.data,
              err: resolve.err,
            });
          console.log(resolve.data);
        })
        .catch((err) => {
          console.log("somthing went wrong");
          console.log(err);
          if (err != null) {
            // io.emit("createmessage", { data: null, err: err });
            io.to("channel-" + message.channel_id).emit("createmessage", {
              data: null,
              err: err,
            });
          } else {
            io.to("channel-" + message.channel_id).emit("createmessage", {
              data: null,
              err: "somthing went wrong",
            });
          }
        });
    });
    socket.on("join-room", (room_name) => {
      socket.join(room_name);
    });

    console.log("connected user");
  });

  // put any other code that wants to use the io variable
  // in here
};
