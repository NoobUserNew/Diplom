import React from "react";
import { Link } from "react-router-dom";

function Enterprises() {
    return (
        <>
            <h1>Предприятия</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default Enterprises;
