// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Lessons from "./components/Lessons";
import AskAI from "./components/AskAI";
import StockTracker from "./components/StockTracker";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/ask-ai" element={<AskAI />} />
                <Route path="/stocktracker" element={<StockTracker />}/>
            </Routes>
        </Router>
    );
}

export default App;