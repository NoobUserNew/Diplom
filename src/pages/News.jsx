// src/pages/News.jsx
import { useEffect, useState } from 'react'
import ListPage from '../components/ListPage'

export default function News() {
	const [slides, setSlides] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchSlides() {
			try {
				const res = await fetch('{$API_URL}/sliders')
				if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
				const data = await res.json()

				// Берём только те, у которых type='news', сортируем по дате (новые сверху), и отрезаем 7 штук
				const newsSlides = data
					.filter(slide => slide.type === 'news')
					.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
					.slice(0, 7)

				setSlides(newsSlides)
				setError(null)
			} catch (err) {
				console.error('Failed to fetch slides:', err)
				setError('Не удалось загрузить данные. Проверьте, работает ли сервер.')
			}
		}

		fetchSlides()
	}, [])

	return (
		<ListPage title='Новости' items={slides} error={error} routePrefix='news' />
	)
}
