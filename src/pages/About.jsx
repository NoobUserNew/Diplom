import React from "react";
import { Link } from "react-router-dom";

function About() {
    return (
        <>
            <h1>О нас</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default About;
