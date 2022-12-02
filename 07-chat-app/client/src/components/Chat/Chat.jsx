import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSearchParams } from 'react-router-dom';

import InfoBar from "../InfoBar/InfoBar"
import Messages from "../Messages/Messages"
import Input from "../Input/Input";
import './Chat.css';

let socket;

const Chat = () => {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState();
  const [room, setRoom] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "http://localhost:5000";

  
  
  useEffect(() => {
    const {name, room} = Object.fromEntries([...searchParams]);
    
    socket = io(ENDPOINT, { transports : ['websocket'] })
    
    setName(name);
    setRoom(room);
    
    socket.emit("join", { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
    
    return () => {
      socket.disconnect();
      
      socket.off();
    }
    
  }, [ENDPOINT, searchParams])
  
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
};

export default Chat;
