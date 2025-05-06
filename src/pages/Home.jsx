import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/slides')
            .then((res) => res.json())
            .then((data) => setSlides(data));
    }, []);

    const renderSlider = (type) => (
        <Swiper
            pagination={{ clickable: true }}
            navigation={true} // === Кнопки навигации влево/вправо
            modules={[Pagination, Navigation]}
            className="my-8"
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
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="img-fluid rounded mb-2"
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <br />
                            {/* Заголовок */}
                            {type === 'news' ? (
                                <Link to={`/news/${slide.id}`} style={{color: '#212529', textDecoration: 'none', fontWeight: 600, fontSize: '24px'}}>
                                    {slide.title}
                                </Link>
                            ) : (
                                <h3 className="font-semibold text-lg">{slide.title.length > 50 ? slide.title.slice(0, 50) + '...' : slide.title}</h3>
                            )}

                            {/* Описание */}
                            {slide.description && (
                                <p className="text-muted small">{slide.description.length > 40 ? slide.description.slice(0, 40) + '...' : slide.description}</p>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );

    return (
        <div className="bg-light text-dark">
            <div className="container py-5">
                <Header/>
                <section className="text-center mb-5">
                    <h1 className="mb-3 text-warning">О компании</h1>
                    <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
                        Наша компания специализируется на производстве высококачественной продукции для различных отраслей.
                    </p>
                    <Link to="/about" className="btn btn-outline-warning mt-3">Узнать больше</Link>
                </section>

                <section className="text-center mb-5 bg-warning-subtle p-4 rounded">
                    <h2 className="mb-3 text-warning">Предприятия</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
                        Познакомьтесь с нашими предприятиями и производственными мощностями.
                    </p>
                    {renderSlider('enterprises')}
                </section>

                <section className="text-center mb-5 bg-warning-subtle p-4 rounded">
                    <h2 className="mb-3 text-warning">Продукция</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
                        Ознакомьтесь с широким ассортиментом нашей продукции.
                    </p>
                    {renderSlider('products')}
                </section>

                <section className="text-center mb-5 bg-warning-subtle">
                    <h2 className="mb-3 text-warning">Новости</h2>
                    <p className="lead mx-auto" style={{ maxWidth: '600px' }}>
                        Последние события и достижения нашей компании.
                    </p>
                    {renderSlider('news')}
                </section>
                <Footer/>
            </div>
        </div>
    );
}
