import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты</h5>
          <p className={styles.text}><strong>Телефон:</strong> +375 (16) 237-00-70</p>
          <p className={styles.text}><strong>Почта:</strong> info@brestkhleb.by</p>
          <p className={styles.text}><strong>Адрес:</strong>Брест, ул. Наганова, 10</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
