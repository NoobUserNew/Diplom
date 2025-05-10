import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function Admin() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [type, setType] = useState('enterprise');
    const [description, setDescription] = useState('');
    const [slides, setSlides] = useState([]);
    const [editingSlide, setEditingSlide] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchSlides = async () => {
        const res = await fetch('http://localhost:3000/sliders');
        const data = await res.json();
        setSlides(data);
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !imageUrl) {
            setSuccessMessage('Заполните обязательные поля: Название и URL изображения');
            return;
        }

        let refId;
        let entityResponse;
        if (type === 'enterprise') {
            entityResponse = await fetch('http://localhost:3000/enterprises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: title, image_url: imageUrl, description, slug: title.toLowerCase().replace(/\s+/g, '-') }),
            });
        } else if (type === 'product') {
            entityResponse = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: title, image_url: imageUrl, description, slug: title.toLowerCase().replace(/\s+/g, '-'), enterprise_id: null }),
            });
        } else if (type === 'news') {
            entityResponse = await fetch('http://localhost:3000/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, image_url: imageUrl, short_description: description, full_text: description, slug: title.toLowerCase().replace(/\s+/g, '-') }),
            });
        }

        if (entityResponse.ok) {
            const entityData = await entityResponse.json();
            refId = entityData.id;
        } else {
            const error = await entityResponse.json();
            setSuccessMessage(`Ошибка при создании сущности: ${error.error || 'Неизвестная ошибка'}`);
            return;
        }

        // Задержка перед созданием слайда (увеличиваем до 200 мс)
        await new Promise(resolve => setTimeout(resolve, 200));

        const sliderResponse = await fetch('http://localhost:3000/sliders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, ref_id: refId, position: slides.length + 1 }),
        });

        if (sliderResponse.ok) {
            setTitle('');
            setImageUrl('');
            setType('enterprise');
            setDescription('');
            fetchSlides();
            showSuccess('Слайд успешно добавлен!');
        } else {
            const error = await sliderResponse.json();
            setSuccessMessage(`Ошибка при создании слайда: ${error.error || 'Неизвестная ошибка'}`);
        }
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/sliders/${id}`, { method: 'DELETE' });
        await fetchSlides();
        showSuccess('Слайд успешно удален!');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingSlide) return;

        const originalType = slides.find(slide => slide.id === editingSlide.id)?.type;
        let newRefId = editingSlide.ref_id;

        // Если тип изменился, создаем новую запись и удаляем старую
        if (originalType !== editingSlide.type) {
            let entityResponse;
            if (editingSlide.type === 'enterprise') {
                entityResponse = await fetch('http://localhost:3000/enterprises', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editingSlide.title, image_url: editingSlide.imageUrl, description: editingSlide.description, slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-') }),
                });
            } else if (editingSlide.type === 'product') {
                entityResponse = await fetch('http://localhost:3000/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editingSlide.title, image_url: editingSlide.imageUrl, description: editingSlide.description, slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'), enterprise_id: null }),
                });
            } else if (editingSlide.type === 'news') {
                entityResponse = await fetch('http://localhost:3000/news', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: editingSlide.title, image_url: editingSlide.imageUrl, short_description: editingSlide.description, full_text: editingSlide.description, slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-') }),
                });
            }

            if (entityResponse.ok) {
                const entityData = await entityResponse.json();
                newRefId = entityData.id;

                // Задержка перед удалением старой записи (увеличиваем до 200 мс)
                await new Promise(resolve => setTimeout(resolve, 200));

                // Удаляем старую запись
                if (originalType === 'enterprise') {
                    await fetch(`http://localhost:3000/enterprises/${editingSlide.ref_id}`, { method: 'DELETE' });
                } else if (originalType === 'product') {
                    await fetch(`http://localhost:3000/products/${editingSlide.ref_id}`, { method: 'DELETE' });
                } else if (originalType === 'news') {
                    await fetch(`http://localhost:3000/news/${editingSlide.ref_id}`, { method: 'DELETE' });
                }
            } else {
                const error = await entityResponse.json();
                setSuccessMessage(`Ошибка при создании новой сущности: ${error.error || 'Неизвестная ошибка'}`);
                return;
            }
        } else {
            // Если тип не изменился, просто обновляем существующую запись
            if (editingSlide.type === 'enterprise') {
                await fetch(`http://localhost:3000/enterprises/${editingSlide.ref_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editingSlide.title, image_url: editingSlide.imageUrl, description: editingSlide.description, slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-') }),
                });
            } else if (editingSlide.type === 'product') {
                await fetch(`http://localhost:3000/products/${editingSlide.ref_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: editingSlide.title, image_url: editingSlide.imageUrl, description: editingSlide.description, slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'), enterprise_id: null }),
                });
            } else if (editingSlide.type === 'news') {
                await fetch(`http://localhost:3000/news/${editingSlide.ref_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: editingSlide.title, image_url: editingSlide.imageUrl, short_description: editingSlide.description, full_text: editingSlide.description, slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-') }),
                });
            }
        }

        // Задержка перед обновлением слайда (увеличиваем до 200 мс)
        await new Promise(resolve => setTimeout(resolve, 200));

        // Обновляем сам слайд
        const sliderResponse = await fetch(`http://localhost:3000/sliders/${editingSlide.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: editingSlide.type, ref_id: newRefId, position: editingSlide.position }),
        });

        if (sliderResponse.ok) {
            setEditingSlide(null);
            fetchSlides();
            showSuccess('Слайд успешно обновлен!');
        } else {
            const error = await sliderResponse.json();
            setSuccessMessage(`Ошибка при обновлении слайда: ${error.error || 'Неизвестная ошибка'}`);
        }
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const renderSlider = (type) => (
        <>
            <h2 className="mt-5 mb-3">{type === 'enterprise' ? 'Предприятия' : type === 'product' ? 'Продукция' : 'Новости'}</h2>
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
                        <option value="enterprise">Предприятия</option>
                        <option value="product">Продукция</option>
                        <option value="news">Новости</option>
                    </select>
                </div>
                <div className="col-md-8">
                    <textarea
                        className="form-control"
                        placeholder="Описание (для новостей и предприя)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Добавить слайд</button>
                </div>
            </form>

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
                                        <option value="enterprise">Предприятия</option>
                                        <option value="product">Продукция</option>
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

            {renderSlider('enterprise')}
            {renderSlider('product')}
            {renderSlider('news')}
        </div>
    );
}