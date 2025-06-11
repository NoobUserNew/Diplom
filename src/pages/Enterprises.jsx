// src/pages/Enterprises.jsx
import React, { useEffect, useState } from 'react';
import ListPage from '../components/ListPage';

export default function Enterprises() {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch('http://localhost:3000/sliders');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();

        // Берём только первые 7 с type 'enterprise'
        const enterpriseSlides = data
          .filter((slide) => slide.type === 'enterprise')
          .slice(0, 7);
        setSlides(enterpriseSlides);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch slides:', err);
        setError('Не удалось загрузить данные. Проверьте, работает ли сервер.');
      }
    }

    fetchSlides();
  }, []);

  return (
    <ListPage
      title="Наши предприятия"
      items={slides}
      error={error}
      routePrefix="enterprise"
    />
  );
}
