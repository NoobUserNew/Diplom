import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function About() {
    return (
        <div className="bg-light text-dark">
            <div className="container py-5">
                <Header />
                <h1>О нас</h1>
                <Link className="text-blue-600" to="/">На главную</Link>
            </div>
        </div>
    );
}

export default About;
