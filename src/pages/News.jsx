import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function News() {
    const [slides, setSlides] = useState([]);

    const fetchSlides = async () => {
        const res = await fetch('http://localhost:5000/api/slides');
        const data = await res.json();
        setSlides(data);
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const newsSlides = slides.filter(slide => slide.type === 'news');

    return (
        <div className='bg-light text-dark'>
            <div className='container my-5'>
                <Header/>
                <Container className="my-5">
                    <h1 className="mb-4 text-center">Новости</h1>
                    <Row>
                        {newsSlides.map((slide) => (
                            <Col key={slide.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="h-100 shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={slide.imageUrl}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        alt={slide.title}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="text-truncate" title={slide.title}>
                                            {slide.title.length > 30 ? slide.title.substring(0, 30) + '...' : slide.title}
                                        </Card.Title>
                                        {slide.description && (
                                            <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                {slide.description.length > 100
                                                    ? slide.description.substring(0, 100) + '...'
                                                    : slide.description}
                                            </Card.Text>
                                        )}
                                        <div className="mt-auto">
                                            <Link to={`/news/${slide.id}`} className="btn btn-warning w-100">
                                                Подробнее
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}
