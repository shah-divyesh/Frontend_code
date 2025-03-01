import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/RecentResponses.css";

function RecentResponses() {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        fetchRecentResponses();
    }, []);

    const fetchRecentResponses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/recent-ai-responses");
            setResponses(response.data.recent_responses);
        } catch (error) {
            console.error("Error fetching recent responses:", error);
        }
    };

    return (
        <div className="recent-responses-container">
            <h2>📝 Recent AI Responses</h2>
            {responses.length === 0 ? (
                <p>No recent questions asked yet.</p>
            ) : (
                <ul className="response-list">
                    {responses.map((res, index) => (
                        <li key={index} className="response-card">
                            <p className="response-question"><strong>Q:</strong> {res.question}</p>
                            <p className="response-answer"><strong>AI:</strong> {res.answer}</p>
                            <p className="response-timestamp">📅 {res.updated_at}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RecentResponses;