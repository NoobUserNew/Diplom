// src/components/CardItem.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/CardItem.module.scss';

export default function CardItem({ item, routePrefix }) {
  const navigate = useNavigate();

  // Умный обработчик клика: если пользователь нажал Ctrl/Cmd+клик, пусть работает Link, иначе – navigate
  const handleClick = (e) => {
    if (!e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      navigate(`/${routePrefix}/${item.id}`);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardBody}>
          <Link
            to={`/${routePrefix}/${item.id}`}
            className={styles.cardTitle}
            title={item.title}
            onClick={handleClick}
          >
            {item.title.length > 30
              ? `${item.title.substring(0, 30)}…`
              : item.title}
          </Link>
          {item.description && (
            <p className={styles.cardText}>
              {item.description.length > 100
                ? `${item.description.substring(0, 100)}…`
                : item.description}
            </p>
          )}
          <button
            className={styles.cardButton}
            onClick={() => navigate(`/${routePrefix}/${item.id}`)}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  routePrefix: PropTypes.string.isRequired,
};
