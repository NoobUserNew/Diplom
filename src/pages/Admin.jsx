import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('enterprises');
  const [description, setDescription] = useState('');
  const [slides, setSlides] = useState([]);

  const fetchSlides = async () => {
    const res = await fetch('http://localhost:5000/api/slides');
    const data = await res.json();
    setSlides(data);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/slides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, imageUrl, type, description }),
    });
    setTitle('');
    setImageUrl('');
    setType('enterprises');
    setDescription('');
    fetchSlides();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/slides/${id}`, { method: 'DELETE' });
    fetchSlides();
  };

  const renderSlider = (type) => (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">{type === 'enterprises' ? 'Предприятия' : type === 'products' ? 'Продукция' : 'Новости'}</h2>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mb-8"
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides
          .filter((slide) => slide.type === type)
          .map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="border p-4 rounded shadow relative">
                <img src={slide.imageUrl} alt={slide.title} className="w-full h-32 object-cover mb-2 rounded" />
                <h3 className="font-semibold text-lg">{slide.title}</h3>
                {slide.description && (
                  <p className="text-sm text-gray-600 mt-1">{slide.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Тип: {slide.type}</p>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded absolute top-2 right-2"
                >
                  ✕
                </button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
      <Link className="text-blue-600" to="/">На главную</Link>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="URL изображения"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="enterprises">Предприятия</option>
          <option value="products">Продукция</option>
          <option value="news">Новости</option>
        </select>
        <textarea
          placeholder="Описание (для новостей)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Добавить слайд
        </button>
      </form>

      {renderSlider('enterprises')}
      {renderSlider('products')}
      {renderSlider('news')}
    </div>
  );
}
