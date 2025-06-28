import http from "http";
import { Socket } from "socket.io";
import router from "./router.js";
import {addUser, deleteUser, getUser, getUserinRoomLists} from "./user";
const express = require('express');

const cors =require("cors");
const app = express();

const server = http.createServer(app);
const io = Socket.io(server);

app.use(cors);
app.use(router);

io.on("connect", (socker)=>{
        // xu li socker lang nghe su kien 

        // su kien 1: join ( hoat dong dang online)
        socker.on("join", ({name, room},callback)=>{
            const {error, user} = addUser({id : socker.id, name : name, room : room});

            if(error)
                return callback(error);

            socker.emit("message", {user :"admin", text :`${user.name}, welcome to your room ${user.room}`} ); // message chinh nguoi dang online
            socker.broadcast.to(user.room).emit("message", {user: "admin", text:`${user.name} has join in room !`}); // message thong bao nhieu nguoi
            io.to(user.room).emit("roomData",{room: user.room, users: getUserinRoomLists(user.room)}) // update roomdata
            

            callback();
        })
        
        //su kien 2 : send message
         socker.on("sendMessage", (message, callback)=>{
            const user = getUser(socker.id);
            io.to(user.room).emit("message", {user: user.name, text: message })
            callback();
        })

        // su kien 3: disconnect
         socker.on("disconnect", ()=>{
            const removeUser = deleteUser(socker.id);
            if(removeUser)
                io.to(user.room).emit("message", {user: "admin", text :`${user.name} has left in room`}); // message cho room user roi khoi
                io.to(user.room).emit("roomData", {room : user.room, users: getUserinRoomLists(user.room)}); // update roomdata

        })
    }
);


server.listen(process.env.PORT || 5000, ()=>console.log("server is running"));

