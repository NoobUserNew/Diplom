import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Холдинга</h5>
          <p className={styles.text}><strong>Телефон:</strong> +375 (16) 237-00-70</p>
          <p className={styles.text}><strong>Почта:</strong> info@brestkhleb.by</p>
          <p className={styles.text}><strong>Адрес:</strong>Брест, ул. Наганова, 10</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Брестского хлебозавода</h5>
          <p className={styles.text}><strong>Телефон:</strong> +375 (162) 24-86-70</p>
          <p className={styles.text}><strong>Почта:</strong> info@brestkhleb.by</p>
          <p className={styles.text}><strong>Адрес:</strong>Республика Беларусь, 224014 г. Брест, ул. Писателя Смирнова, 100</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Барановичского хлебозавода</h5>
          <p className={styles.text}><strong>Телефон:</strong>+375 (163) 64-94-89</p>
          <p className={styles.text}><strong>Почта:</strong>baranovichi@bhp.by</p>
          <p className={styles.text}><strong>Адрес:</strong>225410, Республика Беларусь,
            Брестская область, г. Барановичи, ул. Текстильная , 24</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Пинского хлебозавода</h5>
          <p className={styles.text}><strong>Телефон:</strong>+375 (165) 64-37-55</p>
          <p className={styles.text}><strong>Почта:</strong>info@pinskhleb.com</p>
          <p className={styles.text}><strong>Адрес:</strong>Республика Беларусь,
            225710, Брестская обл, г. Пинск,
            ул. Индустриальная, 2</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Березовского хлебозавода</h5>
          <p className={styles.text}><strong>Телефон:</strong>+8 (343) 384-00-07</p>
          <p className={styles.text}><strong>Почта:</strong>info@pinskhleb.com</p>
          <p className={styles.text}><strong>Адрес:</strong>Республика Беларусь,
            225710, Брестская обл, г. Пинск,
            ул. Индустриальная, 2</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Рыбхоза Селец</h5>
          <p className={styles.text}><strong>Телефон:</strong>+375 (1643) 39-0-41</p>
          <p className={styles.text}><strong>Почта:</strong>oao.ors@selec.by</p>
          <p className={styles.text}><strong>Адрес:</strong>224133, Брестская область, Берёзовский район, д. Морможево</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Рыбхоза Днепробугский</h5>
          <p className={styles.text}><strong>Телефон:</strong>+375 (1644) 4-71-35</p>
          <p className={styles.text}><strong>Адрес:</strong>225855, Дрогичинский р-н, Новоселки д.
          </p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Рыбхоза Полесье</h5>
          <p className={styles.text}><strong>Телефон:</strong>+375 (165) 67-91-06</p>
          <p className={styles.text}><strong>Адрес:</strong>225734, Пинский р-н, Вяз д.</p>
        </div>
        <div className={styles.column}>
          <h5 className={styles.heading}>Контакты Рыбхоза Локтыши</h5>
          <p className={styles.text}><strong>Телефон:</strong>+375 (16) 465-16-40</p>
          <p className={styles.text}><strong>Почта:</strong>fishloktyshi@gmail.ru</p>
          <p className={styles.text}><strong>Адрес:</strong>Ганцевичский р-н, п/о д. Б. Круговичи, Беларусь</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
