import React from "react";
import styles from "../styles/HeroSection.module.scss";

function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1>Добро пожаловать в Брестобхлебопродукт</h1>
                <p>Мы производим качественную хлебобулочную продукцию для каждого дома.</p>
                
            </div>
        </section>
    );
}

export default HeroSection;
