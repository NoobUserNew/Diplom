// Header.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link
          className={styles.logoLink}
          to='/'
          onClick={() => setMenuOpen(false)}
        >
          <img src='/img/logo.png' alt='logo' />
        </Link>

        <button
          className={styles.toggleButton}
          onClick={toggleMenu}
          aria-label='Переключить навигацию'
        >
          <div className={styles.toggleIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div
          className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          <Link
            to='/'
            className={`${styles.navLink} ${
              pathname === '/' ? styles.activeLink : ''
            }`}
          >
            Главная
          </Link>
          {/* остальные ссылки… */}
          <Link
            to='/about'
            className={`${styles.navLink} ${
              pathname === '/about' ? styles.activeLink : ''
            }`}
          >
            О нас
          </Link>
          <Link
            to='/enterprises'
            className={`${styles.navLink} ${
              pathname.startsWith('/enterprises') ? styles.activeLink : ''
            }`}
          >
            Предприятия
          </Link>
          <Link
            to='/products'
            className={`${styles.navLink} ${
              pathname.startsWith('/products') ? styles.activeLink : ''
            }`}
          >
            Продукция
          </Link>
          <Link
            to='/laboratory'
            className={`${styles.navLink} ${
              pathname.startsWith('/laboratory') ? styles.activeLink : ''
            }`}
          >
            Лаборатория
          </Link>
          <Link
            to='/contacts'
            className={`${styles.navLink} ${
              pathname.startsWith('/contacts') ? styles.activeLink : ''
            }`}
          >
            Контакты
          </Link>
          <Link
            to='/news'
            className={`${styles.navLink} ${
              pathname.startsWith('/news') ? styles.activeLink : ''
            }`}
          >
            Новости
          </Link>
        </div>
      </div>
    </nav>
  );
}
