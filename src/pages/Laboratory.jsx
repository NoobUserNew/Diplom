import React from "react";
import { Link } from "react-router-dom";

function Laboratory() {
    return (
        <>
            <h1>Лаборатория</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default Laboratory;
