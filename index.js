const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const EquipmentModel = require("./models/equipment");
const path=require("path")

// configuration to accept json as a body
app.use(express.json());
//configure to extract cookies from request
app.use(cookieParser());
//configure server to accept request from *
app.use(cors());

//configure the server to render the react app

let allPc = [];



// socket configuration
const server = require("http").createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// io.on("connection", (socket) => {


//   // joint room
//   socket.on("join", (equipmentId) => {
//     console.log(equipmentId, "   //id")
//     console.log("equipment is connected");
//     allPc = allPc.map((p) => {
//       if (p._id != equipmentId) {
//         return { ...p};
//       } else {
//         return { ...p, status: true, socketId: socket.id };
//       }
//     });
//     socket.broadcast.emit("sendEquipmentData", allPc);
//   });

//   socket.on("adminJoin", () => {
//     (async () => {
//         try {
//           const equipmentsList = await EquipmentModel.find();
//           allPc = equipmentsList.map((e) => {
//             return { ...e._doc, status: false };
//           });
//         console.log("Admin is connected");
//         socket.emit("sendEquipmentData", allPc);
//         } catch (err) {
//           console.log(err);
//         }
//       })();

//   });

//   socket.on("disconnect", () => {
//     const socketId = socket.id;
//     allPc = allPc.map((p) => {
//       if (p.socketId === socketId) {
//         return { ...p, socketId: null, status: false };
//       } else {
//         return { ...p };
//       }
//     });
//     socket.broadcast.emit("sendEquipmentData", allPc);

//     console.log(allPc, "after equipment logout");
//     console.log("User disconnected");
//   });
// });

app.use(express.static(path.join(__dirname,"public")))

// main routes
app.use("/api", require("./routes/index"));
app.use("*",(req, res, next)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, async (_) => {
  await require("./database/mongoose")();
  console.log(`server is connected to PORT ${PORT}`);
});
