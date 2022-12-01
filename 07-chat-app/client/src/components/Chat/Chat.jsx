import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSearchParams } from 'react-router-dom';

import './Chat.css';

let socket;

const Chat = () => {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState();
  const [room, setRoom] = useState();
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const {name, room} = Object.fromEntries([...searchParams]);

    socket = io(ENDPOINT, { transports : ['websocket'] })

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room })

    return () => {
      socket.disconnect();

      socket.off();
    }
    
  }, [ENDPOINT, searchParams])


  return (<h1>Chat</h1>);
};

export default Chat;
