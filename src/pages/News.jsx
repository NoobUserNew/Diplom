import React from "react";
import { Link } from "react-router-dom";

function News() {
    return (
        <>
            <h1>Новости</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default News;
