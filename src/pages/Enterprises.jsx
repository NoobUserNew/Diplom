// src/pages/Enterprises.jsx
import React, { useEffect, useState } from 'react';
import ListPage from '../components/ListPage';

export default function Enterprises() {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch(`${API_URL}/sliders`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();

        // Берём только первые 7 с type 'enterprise'
        // Формируем массив с правильным id (id предприятия)
        const enterpriseSlides = data
          .filter((slide) => slide.type === 'enterprise')
          .map((slide) => ({
            ...slide,
            id: slide.ref_id, // теперь id = id предприятия
          }));
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
