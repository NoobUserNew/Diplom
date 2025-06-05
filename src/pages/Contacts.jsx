// src/pages/Contacts.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Contacts.module.scss";

export default function Contacts() {
  return (
    <div className={styles.contactsPage}>
      <Header />

      {/* Секция с фоном здания и контактной информацией */}
      <section className={styles.contactSection}>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.phone}>+375 16 237-00-70</p>
          <p className={styles.address}>г. Брест, ул. Наганова, 10</p>
          <p className={styles.description}>
            Мы всегда рады видеть вас в нашем офисе. Позвоните нам или приходите в
            удобное время — будем рады помочь с любыми вопросами!
          </p>
        </div>
      </section>

      <Footer />
    </div>
);
}
