import React from "react";
import { Link } from "react-router-dom";

function Products() {
    return (
        <>
            <h1>Продукция</h1>
            <Link className="text-blue-600" to="/">На главную</Link>
        </>
    );
}

export default Products;
