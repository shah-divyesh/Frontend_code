import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AskAI.css";
import RecentResponses from "./RecentResponses";

function AskAI() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayedAnswer, setDisplayedAnswer] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [showAddLessonPrompt, setShowAddLessonPrompt] = useState(false);
    const [suggestedLevel, setSuggestedLevel] = useState(null);

    useEffect(() => {
        if (answer) {
            setDisplayedAnswer("");
            setCharIndex(0);
        }
    }, [answer]);

    useEffect(() => {
        if (charIndex < answer.length && answer) {
            const timeout = setTimeout(() => {
                setDisplayedAnswer((prev) => prev + answer[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 15);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, answer]);

    const askQuestion = async () => {
        if (!question.trim()) return;
        setLoading(true);
        setAnswer("");
        setShowAddLessonPrompt(false);
        setSuggestedLevel(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/ask-ai", { question });
            setAnswer(response.data.answer);

            if (response.data.prompt_add_lesson) {
                setShowAddLessonPrompt(true);
                setSuggestedLevel(response.data.suggested_level);
            }
        } catch (error) {
            console.error(error);
            setAnswer("❌ Error fetching answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addLesson = async (level) => {
        console.log(`Adding lesson - Level: ${level}, Question: ${question}, Answer: ${answer}`); // ✅ Log data
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/add-lesson", {
                question,
                answer,
                level
            });
    
            console.log("Lesson added response:", response.data); // ✅ Log API response
            setShowAddLessonPrompt(false);
        } catch (error) {
            console.error("Error adding lesson:", error.response?.data || error);
        }
    };

    return (
        <div className="ask-ai-container">
            <h2 className="ask-ai-title">🤖 Ask AI</h2>

            <div className="ask-ai-input-wrapper">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="🔍 Ask something about trading..."
                    className="ask-ai-input"
                />
                <button onClick={askQuestion} className="ask-ai-button">
                    {loading ? "⏳ Asking..." : "Ask"}
                </button>
            </div>

            {answer && <div className="ask-ai-space"></div>}

            {answer && (
                <div className="ask-ai-response">
                    <p className="ask-ai-text">
                        <strong className="ai-label">🤖 AI:</strong> {displayedAnswer}
                    </p>
                </div>
            )}

            {/* Lesson Addition Prompt */}
            {showAddLessonPrompt && (
                <div className="lesson-prompt">
                    <p>📚 Would you like to add this question to learning lessons?</p>
                    <div className="lesson-buttons">
                        {["basic", "intermediate", "advanced"].map((level) => (
                            <button
                                key={level}
                                className={suggestedLevel === level ? "suggested" : ""}
                                onClick={() => addLesson(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <RecentResponses />
        </div>
    );
}

export default AskAI;