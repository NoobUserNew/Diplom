import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Enterprises() {
    const [slides, setSlides] = useState([]);
    const [selectedSlide, setSelectedSlide] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch('http://localhost:3000/sliders');
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setSlides(data.filter(slide => slide.type === 'enterprise').slice(0, 7));
                setError(null);
            } catch (err) {
                console.error('Failed to fetch slides:', err);
                setError('Не удалось загрузить данные. Проверьте, работает ли сервер.');
            }
        };
        fetchSlides();
    }, []);

    return (
        <div className='bg-light text-dark'>
            <div className="container my-5">
                <Header />
                <h1 className="text-center mb-5 fw-bold">Наши предприятия</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-4">
                    {slides.map((slide) => (
                        <div className="col-sm-6 col-md-4" key={slide.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={slide.imageUrl}
                                    className="card-img-top"
                                    alt={slide.title}
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <Link
                                        to={`/enterprise/${slide.ref_id}`}
                                        className="card-title fw-bold text-decoration-none text-primary"
                                        style={{ cursor: 'pointer', color: '#0d6efd', wordBreak: 'break-word' }} // Добавляем перенос слов
                                        onClick={(e) => {
                                            if (!e.ctrlKey && !e.metaKey) e.preventDefault();
                                            navigate(`/enterprise/${slide.ref_id}`);
                                        }}
                                    >
                                        {slide.title}
                                    </Link>
                                    {slide.description && (
                                        <p className="card-text text-muted">{slide.description.slice(0, 80)}...</p>
                                    )}
                                    <button
                                        className="btn btn-outline-primary mt-auto"
                                        onClick={() => navigate(`/enterprise/${slide.ref_id}`)}
                                    >
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Footer/>
            </div>
        </div>
    );
}