import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Header from '../components/Header';

export default function Products() {
    const [slides, setSlides] = useState([]);

    const fetchSlides = async () => {
        const res = await fetch('http://localhost:5000/api/slides');
        const data = await res.json();
        setSlides(data);
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const productSlides = slides.filter(slide => slide.type === 'products');

    return (
        <div className='bg-light text-dark'>
            <div className='container my-5'>
                <Header/>   
                <Container className="my-5">
                    <h1 className="mb-4 text-center">Продукция</h1>
                    <Row>
                        {productSlides.map((slide) => (
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
