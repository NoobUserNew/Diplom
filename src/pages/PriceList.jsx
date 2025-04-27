import React from "react";
import { Link } from "react-router-dom";

function PriceList() {
    return (
        <>
            <h1>Прайс-лист</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default PriceList;
