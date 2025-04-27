import React from "react";
import { Link } from "react-router-dom";

function Contacts() {
    return (
        <>
            <h1>Контакты</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default Contacts;
