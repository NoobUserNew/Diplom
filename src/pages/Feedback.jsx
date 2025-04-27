import React from "react";
import { Link } from "react-router-dom";

function Feedback() {
    return (
        <>
            <h1>Электронное обращение</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default Feedback;
