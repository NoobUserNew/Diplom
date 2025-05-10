import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contacts() {
    return (
        <div className="bg-light text-dark">
            <div className="container my-5">
                <Header />
                <h1>Контакты</h1>
                <Footer/>
            </div>
        </div>
    );
}

export default Contacts;
