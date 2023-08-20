import './App.css';
import Home from "./components/Home/Home";
import Board from "./components/Board/Board";
import { Routes, Route } from "react-router-dom";
import Temp from "./components/dnd/Temp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </>
  );
}

export default App;
