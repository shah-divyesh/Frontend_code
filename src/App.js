// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Lessons from "./components/Lessons";
import AskAI from "./components/AskAI";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/ask-ai" element={<AskAI />} />
            </Routes>
        </Router>
    );
}

export default App;