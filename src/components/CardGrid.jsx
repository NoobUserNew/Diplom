// src/components/CardGrid.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import styles from '../styles/CardGrid.module.scss';

export default function CardGrid({ items, routePrefix }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const elements = gridRef.current.querySelectorAll(`.${styles.fadeInSection}`);
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  return (
    <div ref={gridRef} className={styles.cardsGrid}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.fadeInSection} ${styles.cardWrapper}`}
        >
          <CardItem item={item} routePrefix={routePrefix} />
        </div>
      ))}
    </div>
  );
}

CardGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
      created_at: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
  routePrefix: PropTypes.string.isRequired,
};
