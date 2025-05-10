import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await fetch(`http://localhost:3000/sliders/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setNewsItem(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch news item:', err);
        setError('Не удалось загрузить новость. Проверьте, работает ли сервер.');
      }
    };
    fetchNewsItem();
  }, [id]);

  if (error) {
    return (
      <div className="p-4">
        <Link className="text-blue-600" to="/">← Назад</Link>
        <div className="alert alert-danger mt-4">{error}</div>
      </div>
    );
  }

  if (!newsItem) {
    return <div className="p-4">Загрузка...</div>;
  }

  return (
    <div className="container my-5">
      <Header/>
      <Link className="text-blue-600" to="/">← Назад</Link>
      <h1 className="text-2xl font-bold mb-4">{newsItem.title}</h1>
      <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-64 object-cover rounded mb-4" />
      {newsItem.full_text ? (
        <p className="text-gray-700">{newsItem.full_text}</p>
      ) : (
        newsItem.description && <p className="text-gray-700">{newsItem.description}</p>
      )}
      <Footer/>
    </div>
  );
}