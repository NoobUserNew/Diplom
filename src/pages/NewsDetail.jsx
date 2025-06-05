// src/components/NewsDetail.jsx
import { useEffect, useState } from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/NewsDetail.module.scss'

export default function NewsDetail() {
	const { id } = useParams()
	const [newsItem, setNewsItem] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchNewsItem = async () => {
			try {
				const res = await fetch(`http://localhost:3000/sliders/${id}`)
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`)
				}
				const data = await res.json()
				setNewsItem(data)
				setError(null)
			} catch (err) {
				console.error('Failed to fetch news item:', err)
				setError('Не удалось загрузить новость. Проверьте, работает ли сервер.')
			}
		}
		fetchNewsItem()
	}, [id])

	if (error) {
		return (
			<div className={styles.newsContainer}>
				<Link className={styles.backLink} to='/news'>
					← Назад
				</Link>
				<div className={styles.errorBox}>{error}</div>
			</div>
		)
	}

	if (!newsItem) {
		return (
			<div className={styles.newsContainer}>
				<Header />
				<div className={styles.loading}>Загрузка...</div>
				<Footer />
			</div>
		)
	}

	const { title, author, publishedAt, imageUrl, full_text, description } =
		newsItem

	return (
		<div className={styles.newsContainer}>
			<Header />

			<div className={styles.backWrapper}>
				<Link className={styles.backLink} to='/news'>
					← Назад
				</Link>
			</div>

			<header className={styles.header}>
				<h1 className={styles.title}>{title}</h1>
				<div className={styles.meta}>
					{author && (
						<span className={styles.author}>
							<span className={styles.metaIcon}>✍️</span>
							{author}
						</span>
					)}
					{publishedAt && (
						<span className={styles.date}>
							<span className={styles.metaIcon}>🗓️</span>
							{publishedAt}
						</span>
					)}
				</div>
			</header>

			{imageUrl && (
				<div className={styles.imageWrapper}>
					<img src={imageUrl} alt={title} className={styles.image} />
				</div>
			)}

			<div className={styles.actions}>
				<button
					type='button'
					className={styles.actionButton}
					onClick={() => {
						navigator.clipboard.writeText(window.location.href)
						alert('Ссылка скопирована в буфер обмена!')
					}}
					title='Поделиться'
				>
					<FaShareAlt className={styles.actionIcon} />
					<span className={styles.actionText}>Поделиться</span>
				</button>
			</div>

			<article className={styles.content}>
				{(full_text || description).split('\n\n').map((para, idx) => (
					<p key={idx} className={styles.paragraph}>
						{para}
					</p>
				))}
			</article>

			<Footer />
		</div>
	)
}
