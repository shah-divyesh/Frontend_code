import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Lessons.css"; // Import styles

function Lessons() {
    const [level, setLevel] = useState("basic");
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/lessons/${level}`);
                setLessons(response.data.lessons);
            } catch (error) {
                console.error("Error fetching lessons:", error);
                setLessons([]);
                setError("No lessons found for this level.");
            }
            setLoading(false);
        };

        fetchLessons();
    }, [level]); // No need to include fetchLessons in dependency array

    return (
        <div className="lessons-container">
            <h1>📘 Stock Market Lessons</h1>

            {/* Level Selection Buttons */}
            <div className="lesson-buttons">
                {["basic", "intermediate", "advanced"].map((lvl) => (
                    <button
                        key={lvl}
                        className={level === lvl ? "active" : ""}
                        onClick={() => setLevel(lvl)}
                    >
                        {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </button>
                ))}
            </div>

            {/* Lessons Display */}
            {loading ? (
                <p className="loading-text">⏳ Loading lessons...</p>
            ) : error ? (
                <p className="error-text">{error}</p>
            ) : (
                <div className="lesson-cards">
                    {lessons.map((lesson, index) => (
                        <div key={index} className="lesson-card">
                            <h3>❓ {lesson.question}</h3>
                            <p>💡 {lesson.answer}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Lessons;