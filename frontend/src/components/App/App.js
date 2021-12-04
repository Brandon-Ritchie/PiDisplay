import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { Nav } from "../Nav/Nav";
import { Controls } from "../Controls/Controls";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/controls" element={<Controls />} />
      </Routes>
    </Router>
  );
}

export default App;
