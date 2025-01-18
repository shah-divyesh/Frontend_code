// src/components/AskAI.js
import React, { useState } from "react";
import axios from "axios";

function AskAI() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askQuestion = () => {
        axios.post("http://127.0.0.1:8000/api/ask", { question })
            .then((response) => setAnswer(response.data.answer))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Ask AI</h1>
            <input 
                type="text" 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                placeholder="Ask something about trading..." 
            />
            <button onClick={askQuestion}>Ask</button>
            {answer && <p><strong>Answer:</strong> {answer}</p>}
        </div>
    );
}

export default AskAI;