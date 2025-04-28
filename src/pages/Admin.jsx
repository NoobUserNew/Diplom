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
    const [successMessage, setSuccessMessage] = useState('');

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
        showSuccess('Слайд успешно добавлен!');
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/slides/${id}`, { method: 'DELETE' });
        await fetchSlides();
        showSuccess('Слайд успешно удален!');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingSlide) return;

        await fetch(`http://localhost:5000/api/slides/${editingSlide.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingSlide),
        });

        setEditingSlide(null);
        fetchSlides();
        showSuccess('Слайд успешно обновлен!');
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const renderSlider = (type) => (
        <>
            <h2 className="mt-5 mb-3">{type === 'enterprises' ? 'Предприятия' : type === 'products' ? 'Продукция' : 'Новости'}</h2>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mb-5"
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
                            <div className="card shadow-sm">
                                <img src={slide.imageUrl} alt={slide.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{slide.title}</h5>
                                    {slide.description && <p className="card-text">{slide.description}</p>}
                                    <p className="text-muted" style={{ fontSize: '0.8rem' }}>Тип: {slide.type}</p>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(slide.id)}>Удалить</button>
                                    <button className="btn btn-warning btn-sm" onClick={() => setEditingSlide(slide)} data-bs-toggle="modal" data-bs-target="#editModal">Редактировать</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    );

    return (
        <div className="container my-5">
            <h1 className="mb-4">Админ-панель</h1>
            <Link to="/" className="btn btn-link mb-3">На главную</Link>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="row g-3 mb-5">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL изображения"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="enterprises">Предприятия</option>
                        <option value="products">Продукция</option>
                        <option value="news">Новости</option>
                    </select>
                </div>
                <div className="col-md-8">
                    <textarea
                        className="form-control"
                        placeholder="Описание (для новостей)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Добавить слайд</button>
                </div>
            </form>

            {/* Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {editingSlide && (
                            <form onSubmit={handleUpdate}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Редактировать слайд</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditingSlide(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Название"
                                        value={editingSlide.title}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="URL изображения"
                                        value={editingSlide.imageUrl}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                                        required
                                    />
                                    <select
                                        className="form-select mb-3"
                                        value={editingSlide.type}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, type: e.target.value })}
                                    >
                                        <option value="enterprises">Предприятия</option>
                                        <option value="products">Продукция</option>
                                        <option value="news">Новости</option>
                                    </select>
                                    <textarea
                                        className="form-control"
                                        placeholder="Описание"
                                        value={editingSlide.description || ''}
                                        onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setEditingSlide(null)}>Отмена</button>
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Сохранить</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {renderSlider('enterprises')}
            {renderSlider('products')}
            {renderSlider('news')}
        </div>
    );
}
