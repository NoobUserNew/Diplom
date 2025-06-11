import { useEffect, useState } from 'react'
import { Alert, Container, Row, Spinner } from 'react-bootstrap'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import SearchSortBar from '../components/SearchSortBar'
import styles from '../styles/Products.module.scss'
import HomeButton from '../components/HomeButton'

export default function Products() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// Состояния для поиска/фильтра/сортировки
	const [searchName, setSearchName] = useState('') // Поиск по name
	const [manufacturerFilter, setManufacturerFilter] = useState(null) // null | 'NO_MANUFACTURER' | строка
	const [sortOrder, setSortOrder] = useState(null) // null | 'asc' | 'desc'

	// 1. Получаем все продукты с сервера
	const fetchProducts = async () => {
		try {
			const res = await fetch('http://localhost:3000/products', {
				headers: {
					// Authorization: "Bearer dummy-token-123",
				},
			})
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`)
			}
			const data = await res.json()
			setProducts(data)
			setError(null)
		} catch (err) {
			console.error('Failed to fetch products:', err)
			setError('Не удалось загрузить данные. Проверьте, работает ли сервер.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	// 2. Список уникальных manufacturer (исключая пустые)
	const manufacturers = Array.from(
		new Set(
			products.map(p => p.manufacturer).filter(mfg => mfg && mfg.trim() !== '')
		)
	)

	// 3. Фильтрация и сортировка «на лету»
	const getFilteredAndSorted = () => {
		let filtered = products

		// 3.1. Поиск по name
		if (searchName.trim() !== '') {
			const lowerName = searchName.trim().toLowerCase()
			filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerName))
		}

		// 3.2. Фильтр по manufacturer
		if (manufacturerFilter === 'NO_MANUFACTURER') {
			filtered = filtered.filter(
				p => !p.manufacturer || p.manufacturer.trim() === ''
			)
		} else if (manufacturerFilter) {
			filtered = filtered.filter(p => p.manufacturer === manufacturerFilter)
		}
		// если manufacturerFilter === null, не фильтруем по производителю

		// 3.3. Сортировка по manufacturer
		if (sortOrder === 'asc') {
			filtered = filtered.slice().sort((a, b) => {
				const aMan = (a.manufacturer || '').toLowerCase()
				const bMan = (b.manufacturer || '').toLowerCase()
				return aMan.localeCompare(bMan, 'ru')
			})
		} else if (sortOrder === 'desc') {
			filtered = filtered.slice().sort((a, b) => {
				const aMan = (a.manufacturer || '').toLowerCase()
				const bMan = (b.manufacturer || '').toLowerCase()
				return bMan.localeCompare(aMan, 'ru')
			})
		}

		return filtered
	}

	const filteredAndSortedProducts = getFilteredAndSorted()

	// 4. Обработчик «поиск по name» (при клике на 🔍)
	const onSearchClick = value => {
		setSearchName(value)
	}

	return (
		<div className={styles.productsPage}>
			<div className={styles.containerWrapper}>
				<Header />

				<Container>
					<h1 className={styles.heading}>Продукция</h1>

					{loading && (
						<div className={styles.spinnerWrapper}>
							<Spinner animation='border' role='status' />
						</div>
					)}

					{error && (
						<div className={styles.alertWrapper}>
							<Alert variant='danger' className='alert'>
								{error}
							</Alert>
						</div>
					)}

					{!loading && !error && (
						<>
							{/* 5. Параметры поиска/фильтра/сортировки */}
							<SearchSortBar
								searchName={searchName}
								setSearchName={setSearchName}
								onSearchClick={onSearchClick}
								manufacturers={manufacturers}
								manufacturerFilter={manufacturerFilter}
								setManufacturerFilter={setManufacturerFilter}
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
							/>

							{/* 6. Сетка карточек */}
							<Row className={styles.gridRow}>
								<ProductGrid products={filteredAndSortedProducts} />
							</Row>
						</>
					)}
				</Container>
				<HomeButton href='/' />
				<Footer />
			</div>
		</div>
	)
}
