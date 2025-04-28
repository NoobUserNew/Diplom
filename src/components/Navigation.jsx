import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="collapse navbar-collapse p-4 bg-blue-600 text-white flex flex-wrap" id="navbarContent" style={{display: 'flex',gap: '20px'}}>
      <Link to="/about" className="text-warning" style={{textDecoration: 'none'}}>О нас</Link>
      <Link to="/enterprises" className=" text-warning" style={{textDecoration: 'none'}}>Предприятия</Link>
      <Link to="/products" className=" text-warning" style={{textDecoration: 'none'}}>Продукция</Link>
      <Link to="/laboratory" className=" text-warning" style={{textDecoration: 'none'}}>Лаборатория</Link>
      <Link to="/contacts" className=" text-warning" style={{textDecoration: 'none'}}>Контакты</Link>
      <Link to="/feedback" className=" text-warning" style={{textDecoration: 'none'}}>Электронное обращение</Link>
      <Link to="/news" className=" text-warning" style={{textDecoration: 'none'}}>Новости</Link>
      <Link to="/pricelist" className=" text-warning" style={{textDecoration: 'none'}}>Прайс-лист</Link>
    </nav>
  );
}

export default Navigation;
