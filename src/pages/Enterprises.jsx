import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'; // используем компоненты Bootstrap 5
import Header from '../components/Header';

export default function Enterprises() {
    const [slides, setSlides] = useState([]);
    const [selectedSlide, setSelectedSlide] = useState(null);

    useEffect(() => {
        const fetchSlides = async () => {
            const res = await fetch('http://localhost:5000/api/slides');
            const data = await res.json();
            setSlides(data.filter(slide => slide.type === 'enterprises'));
        };
        fetchSlides();
    }, []);

    return (
        <div className='gb-light text-dark'>
        <div className="container my-5">
            <Header/>
            <h1 className="text-center mb-5 fw-bold">Наши предприятия</h1>
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
                                <h5 className="card-title fw-bold">{slide.title}</h5>
                                {slide.description && (
                                    <p className="card-text text-muted">{slide.description.slice(0, 80)}...</p>
                                )}
                                <button
                                    className="btn btn-outline-primary mt-auto"
                                    onClick={() => setSelectedSlide(slide)}
                                    >
                                    Подробнее
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Модалка Bootstrap */}
            {selectedSlide && (
                <Modal show={true} onHide={() => setSelectedSlide(null)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedSlide.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={selectedSlide.imageUrl}
                            alt={selectedSlide.title}
                            className="img-fluid mb-3 rounded"
                        />
                        <p>{selectedSlide.description}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedSlide(null)}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}