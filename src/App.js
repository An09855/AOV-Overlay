import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import openSocket from "socket.io-client";

import Index from "./pages/Index/Index";
import Admin from "./pages/Admin/Admin";
import Afterpicks from "./pages/Afterpicks/Afterpicks";

import FontStyles from './fonts/fonts';

const socket = openSocket("http://localhost:8000", {
  transports: ["websocket"],
});

function App() {
  return (
    <Router>
      <FontStyles />
      <Routes>
        <Route exact path="/" element={<Index socket={socket} />} />
        <Route path="/admin" element={<Admin socket={socket} />} />
        <Route path="/Afterpicks" element={<Afterpicks socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
