import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-4 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-12 col-md-5 mb-3">
            <h5>Контакты</h5>
            <p className="mb-1">Телефон: +375 (162) 20-00-00</p>
            <p className="mb-1">Почта: info@brestkhleb.by</p>
            <p className="mb-0">Адрес: г. Брест, ул. Промышленная, 1</p>
          </div>
          <div className="col-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
            <p className="mb-0">&copy; 2025 ГО «Брестоблхлебопродукт». Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
