import queryString from "query-string";
import { useEffect, useState } from "react";
import React from "react";
import { io } from "socket.io-client";
import Messages from "../messages/messages";
import Input from "../Input/input";
import Textcontainer from "../TextContainer/textcontainer";
import Infobar from "../InfoBar/infobar";

const ENDPOINT = "https://chatrealtime-qd45.onrender.com";
let socket;
const Chat = ({location}) => {
    const[users, setUsers] = useState('');
    const [name, setName]= useState("");
    const [room, setRoom] = useState("");
    const [notifi, setNotifi] = useState("");
    const [message, setMessage] = useState([]);
    useEffect(()=>{
         const [name, room] = queryString.parse(location.search);
         socket = io(ENDPOINT);
         setRoom(room);
         setName(name);

         socket.emit("join", {name,room}, (error) =>{
            if(error)
                alert(error);
         }); // gui thong tin cho toan bo room 
    },[ENDPOINT, location.search]);
    useEffect(()=>{
       socket.on("message", message =>{

       }) // lang nghe su kien khi thong tin message tu server gui xuong va hien thi man hinh

       socket.on("roomData", ({users}) =>{
        setUsers(users)
       }); // lang nghe su kien khi hien thi them thong tin user vao trong room 
        
    },[]);


    // send message gui tin nhan len server
    const sendMessage =(event) =>{
        event.preventDefaut();
        socket.emit("sendMessage", (message) =>{
            setMessage((messages) =>[...messages], message);
        })

    };


    return(
        <div className="outerContainer">
            <div className="container">
                <Infobar room = {room}/>
                <Messages notifi ={notifi} name={name}/>
                <Input message = {message} setMessage ={setMessage} sendMessage={sendMessage} />
            </div>

            <Textcontainer />
            
        </div>
    );
    
}
export default Chat;