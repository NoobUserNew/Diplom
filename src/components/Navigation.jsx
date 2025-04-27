import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex flex-wrap gap-2">
    <Link to="/about">О нас</Link>
    <Link to="/enterprises">Предприятия</Link>
    <Link to="/products">Продукция</Link>
    <Link to="/laboratory">Лаборатория</Link>
    <Link to="/contacts">Контакты</Link>
    <Link to="/feedback">Электронное обращение</Link>
    <Link to="/news">Новости</Link>
    <Link to="/pricelist">Прайс-лист</Link>
    <Link to="/admin">Admin</Link>
  </nav>
  );
}

export default Navigation;
