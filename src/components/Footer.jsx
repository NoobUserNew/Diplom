import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты</h5>
          <p className={styles.text}><strong>Телефон:</strong> +375 (162) 20-00-00</p>
          <p className={styles.text}><strong>Почта:</strong> info@brestkhleb.by</p>
          <p className={styles.text}><strong>Адрес:</strong> г. Брест, ул. Промышленная, 1</p>
        </div>
        <div className={styles.column}>
          <p className={styles.copyright}>
            © 2025 ГО «Брестоблхлебопродукт». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
