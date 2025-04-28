import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container">
        {/* Логотип */}
        <Link className="navbar-brand fw-bold text-dark" to="/">
          <img src="/img/logo.png" alt="logo" style={{width: '64px', height: '64px'}}/>
        </Link>

        {/* Бургер-кнопка */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Переключить навигацию"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Меню */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0">
            <Link to="/about" className="text-warning" style={{ textDecoration: 'none' }}>
              О нас
            </Link>
            <Link to="/enterprises" className="text-warning" style={{ textDecoration: 'none' }}>
              Предприятия
            </Link>
            <Link to="/products" className="text-warning" style={{ textDecoration: 'none' }}>
              Продукция
            </Link>
            <Link to="/laboratory" className="text-warning" style={{ textDecoration: 'none' }}>
              Лаборатория
            </Link>
            <Link to="/contacts" className="text-warning" style={{ textDecoration: 'none' }}>
              Контакты
            </Link>
            <Link to="/feedback" className="text-warning" style={{ textDecoration: 'none' }}>
              Электронное обращение
            </Link>
            <Link to="/news" className="text-warning" style={{ textDecoration: 'none' }}>
              Новости
            </Link>
            <Link to="/pricelist" className="text-warning" style={{ textDecoration: 'none' }}>
              Прайс-лист
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
