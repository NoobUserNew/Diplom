// frontend/src/pages/NewsDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      const res = await fetch(`http://localhost:5000/api/slides/${id}`);
      const data = await res.json();
      setNewsItem(data);
    };
    fetchNewsItem();
  }, [id]);

  if (!newsItem) {
    return <div className="p-4">Загрузка...</div>;
  }

  return (
    <div className="p-4">
      <Link className="text-blue-600" to="/">← Назад</Link>
      <h1 className="text-2xl font-bold mb-4">{newsItem.title}</h1>
      <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-64 object-cover rounded mb-4" />
      {newsItem.description && (
        <p className="text-gray-700">{newsItem.description}</p>
      )}
    </div>
  );
}
