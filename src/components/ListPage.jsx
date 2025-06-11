// src/components/ListPage.jsx
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styles from '../styles/Enterprises.module.scss' // используем общий SCSS для обёртки, заголовка, ошибки и анимаций
import CardGrid from './CardGrid'
import Footer from './Footer'
import Header from './Header'
import HomeButton from './HomeButton'

export default function ListPage({ title, items, error, routePrefix }) {
	// IntersectionObserver для секции с заголовком и карточек
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
	}, [items])

	return (
		<div className={styles.pageWrapper}>
			<div className={`container ${styles.innerContainer}`}>
				<Header />

				{/* Заголовок страницы с анимацией fadeIn */}
				<section className={`${styles.fadeInSection} ${styles.topSection}`}>
					<h1 className={styles.heading}>{title}</h1>
				</section>

				{/* Блок ошибки (передаётся сверху) */}
				{error && <div className={styles.errorBox}>{error}</div>}

				{/* Сетка карточек (переданные items) */}
				<CardGrid items={items} routePrefix={routePrefix} />
				<HomeButton href='/' />
				<Footer />
			</div>
		</div>
	)
}

ListPage.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			imageUrl: PropTypes.string,
			created_at: PropTypes.string, // используется при сортировке новостей
			type: PropTypes.string,
		})
	).isRequired,
	error: PropTypes.string,
	routePrefix: PropTypes.string.isRequired,
}

ListPage.defaultProps = {
	error: null,
}
