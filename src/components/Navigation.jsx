import React from "react";
import styles from "../styles/Navigation.module.scss";

function Navigation() {
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <a href="/about">О нас</a>
                <a href="/enterprises">Предприятия</a>
                <a href="/products">Продукция</a>
                <a href="/laboratory">Лаборатория</a>
                <a href="/contacts">Контакты</a>
                <a href="/feedback">Электронное обращение</a>
                <a href="/news">Новости</a>
                <a href="/price-list">Прайс-лист</a>
            </nav>
        </div>
    );
}

export default Navigation;