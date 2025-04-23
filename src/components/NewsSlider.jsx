import React, { useState } from "react";
import styles from "../styles/NewsSlider.module.scss";

const newsData = [
    { id: 1, img: "/img/news1.jpg", title: "Новость 1", description: "Описание новости 1" },
    { id: 2, img: "/img/news2.jpg", title: "Новость 2", description: "Описание новости 2" },
    { id: 3, img: "/img/news3.jpg", title: "Новость 3", description: "Описание новости 3" },
    { id: 4, img: "/img/ava.jpg", title: "Новость 4", description: "Описание новости 4" },
    { id: 5, img: "/img/ava.jpg", title: "Новость 5", description: "Описание новости 5" },
];

function NewsSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, newsData.length - 3));
    };

    return (
        <div className={styles.sliderContainer}>
            <button onClick={handlePrev} className={styles.navButton} disabled={currentIndex === 0}>
                {"<"}
            </button>
            <div className={styles.slider}>
                {newsData.slice(currentIndex, currentIndex + 3).map(news => (
                    <div key={news.id} className={styles.newsItem}>
                        <img src={news.img} alt={news.title} className={styles.image} />
                        <h3 className={styles.title}>{news.title}</h3>
                        <p className={styles.description}>{news.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleNext} className={styles.navButton} disabled={currentIndex === newsData.length - 3}>
                {">"}
            </button>
        </div>
    );
}

export default NewsSlider;
