import React from "react";
import styles from "../styles/FeaturesSection.module.scss";

function FeaturesSection() {
    const features = [
        { id: 1, title: "Качество", description: "Мы используем только лучшие ингредиенты." },
        { id: 2, title: "Традиции", description: "Наши рецепты проверены временем." },
        { id: 3, title: "Доставка", description: "Мы обеспечиваем быструю и надежную доставку." },
    ];

    return (
        <section className={styles.features}>
            <h2>Наши преимущества</h2>
            <div className={styles.featureList}>
                {features.map(feature => (
                    <div key={feature.id} className={styles.feature}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturesSection;
