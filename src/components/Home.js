import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css"; // Import global styles

function Home() {
    const navigate = useNavigate(); // Hook to navigate pages

    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="home-hero">
                <h1 className="home-title">📈 Welcome to Stock Market Learning</h1>
                <p className="home-subtitle">
                    Master stock trading, analyze market trends, and explore AI-driven insights.
                </p>
            </div>

            {/* Features Section */}
            <div className="home-features">
                <div className="feature-card" onClick={() => navigate("/lessons")}>
                    <h3>📚 Interactive Lessons</h3>
                    <p>Learn trading concepts through structured lessons.</p>
                </div>
                <div className="feature-card" onClick={() => navigate("/ask-ai")}>
                    <h3>🤖 AI-Powered Insights</h3>
                    <p>Ask AI for instant trading knowledge.</p>
                </div>
                <div className="feature-card" onClick={() => navigate("/stocktracker")}>
                    <h3>📊 Real-time Stock Tracking</h3>
                    <p>Monitor live stock prices and analyze trends.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;