import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Nav from '../components/Navigation';

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
                            <img src={slide.imageUrl} alt={slide.title} className="w-full h-32 object-cover mb-2 rounded" />
                            <br />
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
                        </div>
                    </SwiperSlide>
                ))}
        </Swiper>
    );

    return (
        <div className="p-4">
            <Nav />
            <h1 className="text-2xl font-bold mb-6">Главная страница</h1>

            <h2 className="text-xl font-semibold mb-4">Наши предприятия</h2>
            {renderSlider('enterprises')}

            <h2 className="text-xl font-semibold mb-4">Наша продукция</h2>
            {renderSlider('products')}

            <h2 className="text-xl font-semibold mb-4">Новости</h2>
            {renderSlider('news')}
        </div>
    );
}
