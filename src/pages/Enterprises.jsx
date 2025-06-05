// src/pages/Enterprises.jsx

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Enterprises.module.scss'

export default function Enterprises() {
	const [slides, setSlides] = useState([])
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchSlides = async () => {
			try {
				const res = await fetch('http://localhost:3000/sliders')
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`)
				}
				const data = await res.json()
				// Берём только первые 7 с type 'enterprise'
				setSlides(data.filter(slide => slide.type === 'enterprise').slice(0, 7))
				setError(null)
			} catch (err) {
				console.error('Failed to fetch slides:', err)
				setError('Не удалось загрузить данные. Проверьте, работает ли сервер.')
			}
		}
		fetchSlides()
	}, [])

	// IntersectionObserver для анимаций появления карточек
	useEffect(() => {
		const elements = document.querySelectorAll(`.${styles.fadeInSection}`)
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.15,
		}
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add(styles.isVisible)
					observer.unobserve(entry.target)
				}
			})
		}, observerOptions)

		elements.forEach(el => observer.observe(el))
		return () => observer.disconnect()
	}, [slides])

	return (
		<div className={styles.pageWrapper}>
			<div className={`container ${styles.innerContainer}`}>
				<Header />

				{/* Заголовок страницы */}
				<section className={`${styles.fadeInSection} ${styles.topSection}`}>
					<h1 className={styles.heading}>Наши предприятия</h1>
				</section>

				{/* Ошибка загрузки */}
				{error && <div className={styles.errorBox}>{error}</div>}

				{/* Сетка карточек */}
				<div className={styles.cardsGrid}>
					{slides.map(slide => (
						<div
							key={slide.id}
							className={`${styles.fadeInSection} ${styles.cardWrapper}`}
						>
							<div className={styles.card}>
								<div className={styles.imageWrapper}>
									<img
										src={slide.imageUrl}
										alt={slide.title}
										className={styles.cardImage}
									/>
								</div>
								<div className={styles.cardBody}>
									<Link
										to={`/enterprise/${slide.ref_id}`}
										className={styles.cardTitle}
										onClick={e => {
											// Чтобы ссылка работала и при клике без модификаторов, и при Ctrl+клике
											if (!e.ctrlKey && !e.metaKey) e.preventDefault()
											navigate(`/enterprise/${slide.ref_id}`)
										}}
									>
										{slide.title}
									</Link>
									{slide.description && (
										<p className={styles.cardText}>
											{slide.description.slice(0, 80)}…
										</p>
									)}
									<button
										className={styles.cardButton}
										onClick={() => navigate(`/enterprise/${slide.ref_id}`)}
									>
										Подробнее
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				<Footer />
			</div>
		</div>
	)
}
