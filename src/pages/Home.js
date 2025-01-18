import React, { useState, useEffect } from "react";
import axios from "axios";

function Lessons() {
    const [level, setLevel] = useState("basic");
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/lessons/${level}`)
            .then((response) => setLessons(response.data.lessons))
            .catch((error) => console.error(error));
    }, [level]);

    return (
        <div>
            <h1>Lessons</h1>
            <button onClick={() => setLevel("basic")}>Basic</button>
            <button onClick={() => setLevel("intermediate")}>Intermediate</button>
            <button onClick={() => setLevel("advanced")}>Advanced</button>
            <ul>
                {lessons.map((lesson, index) => (
                    <li key={index}>{lesson}</li>
                ))}
            </ul>
        </div>
    );
}

export default Lessons;