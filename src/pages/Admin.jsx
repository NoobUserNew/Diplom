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
    const [editingSlide, setEditingSlide] = useState(null);


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
        await fetchSlides();
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingSlide) return;

        await fetch(`http://localhost:5000/api/slides/${editingSlide.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: editingSlide.title,
                imageUrl: editingSlide.imageUrl,
                type: editingSlide.type,
                description: editingSlide.description || '', // <-- добавляем описание
            }),
        });

        setEditingSlide(null);
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

                                {/* Заголовок */}
                                {type === 'news' ? (
                                    <Link to={`/news/${slide.id}`} className="font-semibold text-lg text-blue-600 hover:underline">
                                        {slide.title}
                                    </Link>
                                ) : (
                                    <h3 className="font-semibold text-lg">{slide.title}</h3>
                                )}

                                {/* Описание */}
                                {slide.description && (
                                    <p className="text-sm text-gray-600 mt-1">{slide.description}</p>
                                )}

                                {/* Тип */}
                                <p className="text-xs text-gray-500 mt-1">Тип: {slide.type}</p>

                                {/* Кнопки удалить и редактировать */}
                                <button
                                    onClick={() => handleDelete(slide.id)}
                                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded absolute top-2 right-2"
                                >
                                    Удалить
                                </button>
                                <button
                                    onClick={() => setEditingSlide(slide)}
                                    className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                                >
                                    Редактировать
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
            {editingSlide && (
                <form onSubmit={handleUpdate} className="space-y-4 mt-8 border-t pt-4">
                    <h2 className="text-xl font-bold">Редактировать слайд</h2>
                    <input
                        type="text"
                        placeholder="Название"
                        value={editingSlide.title}
                        onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                        className="border p-2 w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL изображения"
                        value={editingSlide.imageUrl}
                        onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                        className="border p-2 w-full"
                        required
                    />
                    <select
                        value={editingSlide.type}
                        onChange={(e) => setEditingSlide({ ...editingSlide, type: e.target.value })}
                        className="border p-2 w-full"
                    >
                        <option value="enterprises">Предприятия</option>
                        <option value="products">Продукция</option>
                        <option value="news">Новости</option>
                    </select>
                    <textarea
                        placeholder="Описание (для новостей)"
                        value={editingSlide.description || ''}
                        onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                        className="border p-2 w-full"
                    />
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        Сохранить изменения
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditingSlide(null)}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Отмена
                    </button>
                </form>
            )}
            {renderSlider('enterprises')}
            {renderSlider('products')}
            {renderSlider('news')}
        </div>
    );
}
