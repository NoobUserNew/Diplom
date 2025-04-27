import { useEffect, useState } from 'react';

export default function Slider({ type }) {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch(`http://localhost:5000/api/slides?type=${type}`);
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error('Ошибка загрузки слайдов:', error);
      }
    }
    fetchSlides();
  }, [type]);

  if (slides.length === 0) return <div>Нет слайдов для отображения.</div>;

  return (
    <div className="flex overflow-x-scroll space-x-4 py-4">
      {slides.map((slide) => (
        <img key={slide.id} src={slide.imageUrl} alt={slide.title} className="w-64 h-40 object-cover rounded" />
      ))}
    </div>
  );
}