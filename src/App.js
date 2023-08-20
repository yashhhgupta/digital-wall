import './App.css';
import Home from "./components/Home/Home";
import Board from "./components/Board/Board";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
    </>
  );
}

export default App;
