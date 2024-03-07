import { Button, ButtonGroup } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/HomePage";
import ChatPage from "./Pages/Chat/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/chats" element={<ChatPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
