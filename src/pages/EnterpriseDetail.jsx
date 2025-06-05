import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/EnterpriseDetail.module.scss'

export default function EnterpriseDetail() {
	const { id } = useParams()
	const [enterprise, setEnterprise] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchEnterprise = async () => {
			setLoading(true)
			try {
				const res = await fetch(`http://localhost:3000/enterprises/${id}`)
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`)
				}
				const data = await res.json()
				console.log('Fetched enterprise data:', data)
				setEnterprise(data)
				setError(null)
			} catch (err) {
				console.error('Failed to fetch enterprise:', err)
				setError(`Не удалось загрузить данные предприятия: ${err.message}`)
			} finally {
				setLoading(false)
			}
		}
		fetchEnterprise()
	}, [id])

	if (error) {
		return (
			<div className={styles.errorPage}>
				<Link className={styles.backLink} to='/enterprises'>
					← Назад
				</Link>
				<div className={styles.errorBox}>{error}</div>
			</div>
		)
	}

	if (loading || !enterprise) {
		return <div className={styles.loader}>Загрузка...</div>
	}

	return (
		<div className={styles.detailWrapper}>
			<Header />

			<div className={styles.innerContainer}>
				<Link className={styles.backLink} to='/enterprises'>
					← Назад
				</Link>

				{/* Блок с фото слева и названием справа */}
				<div className={styles.headerBlock}>
					<div className={styles.headerImage}>
						{enterprise.image_url ? (
							<img
								src={enterprise.image_url}
								alt={enterprise.name}
								onError={e => {
									console.error('Image failed to load:', e.target.src)
									e.target.src = 'https://via.placeholder.com/200?text=No+Image'
								}}
							/>
						) : (
							<div className={styles.noAvatar}>Нет фото</div>
						)}
					</div>

					<div className={styles.headerInfo}>
						<h1 className={styles.detailTitle}>{enterprise.name}</h1>
					</div>
				</div>

				{/* Описание ниже */}
				{enterprise.description && (
					<p className={styles.description}>{enterprise.description}</p>
				)}
			</div>

			<Footer />
		</div>
	)
}
