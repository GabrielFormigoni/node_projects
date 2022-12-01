import React from 'react';

import Chat from './components/Chat/Chat.jsx';
import Join from './components/Join/Join.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" exact element={<Join />}/>
        <Route path="/chat" exact element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;