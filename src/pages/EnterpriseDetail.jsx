import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
export default function EnterpriseDetail() {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnterprise = async () => {
      setLoading(true); // Устанавливаем состояние загрузки
      try {
        const res = await fetch(`http://localhost:3000/enterprises/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched enterprise data:', data); // Логирование данных
        if (!data.image_url) {
          console.warn('Image URL is missing or empty:', data);
        }
        setEnterprise(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch enterprise:', err);
        setError(`Не удалось загрузить данные предприятия: ${err.message}`);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };
    fetchEnterprise();
  }, [id]);

  if (error) {
    return (
      <div className="p-4">
        <Link className="text-blue-600" to="/">← Назад</Link>
        <div className="alert alert-danger mt-4">{error}</div>
      </div>
    );
  }

  if (loading || !enterprise) {
    return <div className="p-4">Загрузка...</div>;
  }

  return (
    <div className="container my-5">
     <Header/>
      <Link className="text-blue-600" to="/enterprises">← Назад</Link>
      <h1 className="text-2xl font-bold mb-4">{enterprise.name}</h1>
      {enterprise.image_url ? (
        <img
          src={enterprise.image_url}
          alt={enterprise.name}
          className="w-full h-64 object-cover rounded mb-4"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            e.target.src = 'https://via.placeholder.com/400x300';
          }}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
          Нет изображения
        </div>
      )}
      {enterprise.description && (
        <p className="text-gray-700">{enterprise.description}</p>
      )}
      <Footer/>
    </div>
  );
}