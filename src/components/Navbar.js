import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/ask-ai">Ask AI</Link>
            <Link to="/simulator">Simulator</Link>
        </nav>
    );
}

export default Navbar;