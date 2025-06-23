import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Admin() {
	const [title, setTitle] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [type, setType] = useState('enterprise')
	const [description, setDescription] = useState('')
	const [enterpriseId, setEnterpriseId] = useState('')
	const [manufacturer, setManufacturer] = useState('')
	const [shelfLife, setShelfLife] = useState('')
	const [proteins, setProteins] = useState('')
	const [fats, setFats] = useState('')
	const [carbs, setCarbs] = useState('')
	const [weight, setWeight] = useState('')
	const [storage, setStorage] = useState('')
	const [energy, setEnergy] = useState('')
	const [slides, setSlides] = useState([])
	const [editingSlide, setEditingSlide] = useState(null)
	const [successMessage, setSuccessMessage] = useState('')
	const [enterprises, setEnterprises] = useState([])
	// const [products, setProducts] = useState([])
	// const [news, setNews] = useState([])
	const API_URL = process.env.REACT_APP_API_URL
	const [error, setError] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('token')
	)
	const [loginData, setLoginData] = useState({ username: '', password: '' })
	const [showLogin, setShowLogin] = useState(!isAuthenticated)

	const fetchSlides = async () => {
		if (!isAuthenticated) return
		try {
			const res = await fetch(`${API_URL}/sliders`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			if (!res.ok)
				throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`)
			const data = await res.json()
			setSlides(data)
		} catch (err) {
			console.error('Fetch error:', err)
			setError(`Ошибка загрузки: ${err.message}`)
		}
	}

	const fetchEnterprises = async () => {
		if (!isAuthenticated) return
		try {
			const res = await fetch(`${API_URL}/enterprises`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
			if (!res.ok)
				throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`)
			const data = await res.json()
			setEnterprises(data)
		} catch (err) {
			console.error('Fetch enterprises error:', err)
			setError(`Ошибка загрузки предприятий: ${err.message}`)
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			fetchSlides()
			fetchEnterprises()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [[isAuthenticated]])

	const handleLogin = async e => {
		e.preventDefault()
		try {
			const response = await fetch(`${API_URL}/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loginData),
			})
			if (!response.ok) throw new Error('Login failed')
			const data = await response.json()
			if (data.success) {
				setError(null)
				localStorage.setItem('token', data.token || 'dummy-token')
				setIsAuthenticated(true)
				setShowLogin(false)
				fetchSlides()
				fetchEnterprises()
			}
		} catch (err) {
			console.error('Login error:', err)
			setError('Ошибка авторизации. Проверьте логин и пароль.')
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuthenticated(false)
		setShowLogin(true)
		setSlides([])
		setEnterprises([])
		// setProducts([])
		// setNews([])
		setError(null)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!isAuthenticated) return

		if (!title || !imageUrl) {
			setSuccessMessage(
				'Заполните обязательные поля: Название и URL изображения'
			)
			return
		}

		let refId
		let entityResponse
		if (type === 'enterprise') {
			entityResponse = await fetch(`${API_URL}/enterprises`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					name: title,
					image_url: imageUrl,
					description,
					slug: title.toLowerCase().replace(/\s+/g, '-'),
				}),
			})
		} else if (type === 'product') {
			entityResponse = await fetch(`${API_URL}/products`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					name: title,
					image_url: imageUrl,
					slug: title.toLowerCase().replace(/\s+/g, '-'),
					enterprise_id: enterpriseId || null,
					manufacturer: manufacturer || null,
					shelf_life: shelfLife || null,
					proteins: proteins || null,
					fats: fats || null,
					carbs: carbs || null,
					weight: weight || null,
					storage: storage || null,
					energy: energy || null,
					description: description || null,
				}),
			})
		} else if (type === 'news') {
			entityResponse = await fetch(`${API_URL}/news`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					title,
					image_url: imageUrl,
					short_description: description,
					full_text: description,
					slug: title.toLowerCase().replace(/\s+/g, '-'),
				}),
			})
		}

		if (entityResponse.ok) {
			const entityData = await entityResponse.json()
			refId = entityData.id
		} else {
			const error = await entityResponse.json()
			setSuccessMessage(
				`Ошибка при создании сущности: ${error.error || 'Неизвестная ошибка'}`
			)
			return
		}

		await new Promise(resolve => setTimeout(resolve, 200))

		const sliderResponse = await fetch(`${API_URL}/sliders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				type,
				ref_id: refId,
				position: slides.length + 1,
			}),
		})

		if (sliderResponse.ok) {
			setTitle('')
			setImageUrl('')
			setType('enterprise')
			setDescription('')
			setEnterpriseId('')
			setManufacturer('')
			setShelfLife('')
			setProteins('')
			setFats('')
			setCarbs('')
			setWeight('')
			setStorage('')
			setEnergy('')
			fetchSlides()
			showSuccess('Успешно добавлено!')
		} else {
			const error = await sliderResponse.json()
			setSuccessMessage(
				`Ошибка при создании: ${error.error || 'Неизвестная ошибка'}`
			)
		}
	}

	const handleDelete = async id => {
		if (!isAuthenticated) return
		const slide = slides.find(s => s.id === id)
		if (!slide) return

		await fetch(`${API_URL}/sliders/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		})

		if (slide.type === 'enterprise') {
			await fetch(`${API_URL}/enterprises/${slide.ref_id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
		} else if (slide.type === 'product') {
			await fetch(`${API_URL}/products/${slide.ref_id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
		} else if (slide.type === 'news') {
			await fetch(`${API_URL}/news/${slide.ref_id}`, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			})
		}

		await fetchSlides()
		showSuccess('Успешно удалено!')
	}

	const handleUpdate = async e => {
		e.preventDefault()
		if (!isAuthenticated || !editingSlide) return

		const originalType = slides.find(
			slide => slide.id === editingSlide.id
		)?.type
		let newRefId = editingSlide.ref_id

		if (originalType !== editingSlide.type) {
			let entityResponse
			if (editingSlide.type === 'enterprise') {
				entityResponse = await fetch(`${API_URL}/enterprises`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						name: editingSlide.title,
						image_url: editingSlide.imageUrl,
						description: editingSlide.description,
						slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'),
					}),
				})
			} else if (editingSlide.type === 'product') {
				entityResponse = await fetch(`${API_URL}/products`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						name: editingSlide.title,
						image_url: editingSlide.imageUrl,
						slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'),
						enterprise_id: editingSlide.enterpriseId || null,
						manufacturer: editingSlide.manufacturer || null,
						shelf_life: editingSlide.shelfLife || null,
						proteins: editingSlide.proteins || null,
						fats: editingSlide.fats || null,
						carbs: editingSlide.carbs || null,
						weight: editingSlide.weight || null,
						storage: editingSlide.storage || null,
						energy: editingSlide.energy || null,
						description: editingSlide.description || null,
					}),
				})
			} else if (editingSlide.type === 'news') {
				entityResponse = await fetch(`${API_URL}/news`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						title: editingSlide.title,
						image_url: editingSlide.imageUrl,
						short_description: editingSlide.description,
						full_text: editingSlide.description,
						slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'),
					}),
				})
			}

			if (entityResponse.ok) {
				const entityData = await entityResponse.json()
				newRefId = entityData.id

				await new Promise(resolve => setTimeout(resolve, 200))

				if (originalType === 'enterprise') {
					await fetch(
						`${API_URL}/enterprises/${editingSlide.ref_id}`,
						{
							method: 'DELETE',
							headers: {
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					)
				} else if (originalType === 'product') {
					await fetch(`${API_URL}/products/${editingSlide.ref_id}`, {
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					})
				} else if (originalType === 'news') {
					await fetch(`${API_URL}/news/${editingSlide.ref_id}`, {
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					})
				}
			} else {
				const error = await entityResponse.json()
				setSuccessMessage(
					`Ошибка при создании новой сущности: ${
						error.error || 'Неизвестная ошибка'
					}`
				)
				return
			}
		} else {
			if (editingSlide.type === 'enterprise') {
				await fetch(
					`${API_URL}/enterprises/${editingSlide.ref_id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
						body: JSON.stringify({
							name: editingSlide.title,
							image_url: editingSlide.imageUrl,
							description: editingSlide.description,
							slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'),
						}),
					}
				)
			} else if (editingSlide.type === 'product') {
				await fetch(`${API_URL}/products/${editingSlide.ref_id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						name: editingSlide.title,
						image_url: editingSlide.imageUrl,
						slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'),
						enterprise_id: editingSlide.enterpriseId || null,
						manufacturer: editingSlide.manufacturer || null,
						shelf_life: editingSlide.shelfLife || null,
						proteins: editingSlide.proteins || null,
						fats: editingSlide.fats || null,
						carbs: editingSlide.carbs || null,
						weight: editingSlide.weight || null,
						storage: editingSlide.storage || null,
						energy: editingSlide.energy || null,
						description: editingSlide.description || null,
					}),
				})
			} else if (editingSlide.type === 'news') {
				await fetch(`${API_URL}/news/${editingSlide.ref_id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify({
						title: editingSlide.title,
						image_url: editingSlide.imageUrl,
						short_description: editingSlide.description,
						full_text: editingSlide.description,
						slug: editingSlide.title.toLowerCase().replace(/\s+/g, '-'),
					}),
				})
			}
		}

		await new Promise(resolve => setTimeout(resolve, 200))

		const sliderResponse = await fetch(
			`${API_URL}/sliders/${editingSlide.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify({
					type: editingSlide.type,
					ref_id: newRefId,
					position: editingSlide.position,
				}),
			}
		)

		if (sliderResponse.ok) {
			setEditingSlide(null)
			fetchSlides()
			showSuccess('Успешно обновлено!')
		} else {
			const error = await sliderResponse.json()
			setSuccessMessage(
				`Ошибка при обновлении: ${error.error || 'Неизвестная ошибка'}`
			)
		}
	}

	const showSuccess = message => {
		setSuccessMessage(message)
		setTimeout(() => setSuccessMessage(''), 3000)
	}

	const renderSlider = type => (
		<>
			<h2 className='mt-5 mb-3'>
				{type === 'enterprise'
					? 'Предприятия'
					: type === 'product'
					? 'Продукция'
					: 'Новости'}
			</h2>
			<Swiper
				navigation={true}
				modules={[Navigation]}
				className='mb-5'
				slidesPerView={1}
				spaceBetween={20}
				breakpoints={{
					640: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}}
			>
				{slides
					.filter(slide => slide.type === type)
					.map(slide => (
						<SwiperSlide key={slide.id}>
							<div className='card shadow-sm'>
								<img
									src={slide.imageUrl}
									alt={slide.title}
									className='card-img-top'
									style={{ height: '200px', objectFit: 'cover' }}
								/>
								<div className='card-body'>
									<h5 className='card-title'>{slide.title}</h5>
									{slide.description && (
										<p className='card-text'>{slide.description}</p>
									)}
									{slide.type === 'product' && (
										<>
											{slide.manufacturer && (
												<p className='card-text'>
													<strong>Производитель:</strong> {slide.manufacturer}
												</p>
											)}
											{slide.shelfLife && (
												<p className='card-text'>
													<strong>Срок годности:</strong> {slide.shelfLife}
												</p>
											)}
											{slide.proteins && (
												<p className='card-text'>
													<strong>Белки:</strong> {slide.proteins}
												</p>
											)}
											{slide.fats && (
												<p className='card-text'>
													<strong>Жиры:</strong> {slide.fats}
												</p>
											)}
											{slide.carbs && (
												<p className='card-text'>
													<strong>Углеводы:</strong> {slide.carbs}
												</p>
											)}
											{slide.weight && (
												<p className='card-text'>
													<strong>Вес:</strong> {slide.weight}
												</p>
											)}
											{slide.storage && (
												<p className='card-text'>
													<strong>Условия хранения:</strong> {slide.storage}
												</p>
											)}
											{slide.energy && (
												<p className='card-text'>
													<strong>Энергетическая ценность:</strong>{' '}
													{slide.energy}
												</p>
											)}
										</>
									)}
									<p className='text-muted' style={{ fontSize: '0.8rem' }}>
										Тип: {slide.type}
									</p>
									<button
										className='btn btn-danger btn-sm me-2'
										onClick={() => handleDelete(slide.id)}
									>
										Удалить
									</button>
									<button
										className='btn btn-warning btn-sm'
										onClick={() => setEditingSlide(slide)}
										data-bs-toggle='modal'
										data-bs-target='#editModal'
									>
										Редактировать
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
			</Swiper>
		</>
	)

	if (showLogin) {
		return (
			<div className='container my-5'>
				<h1 className='mb-4 text-center'>Вход в админ-панель</h1>
				{error && <div className='alert alert-danger'>{error}</div>}
				<Form onSubmit={handleLogin}>
					<Form.Group className='mb-3'>
						<Form.Label>Логин</Form.Label>
						<Form.Control
							type='text'
							value={loginData.username}
							onChange={e =>
								setLoginData({ ...loginData, username: e.target.value })
							}
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type='password'
							value={loginData.password}
							onChange={e =>
								setLoginData({ ...loginData, password: e.target.value })
							}
							required
						/>
					</Form.Group>
					<Button variant='primary' type='submit'>
						Войти
					</Button>
				</Form>
			</div>
		)
	}

	return (
		<div className='container my-5'>
			<h1 className='mb-4'>Админ-панель</h1>
			<Link to='/' className='btn btn-link mb-3'>
				На главную
			</Link>
			<Button variant='danger' onClick={handleLogout} className='mb-3 ms-2'>
				Выход
			</Button>

			{successMessage && (
				<div className='alert alert-success'>{successMessage}</div>
			)}
			{error && <div className='alert alert-danger'>{error}</div>}

			<Form onSubmit={handleSubmit} className='row g-3 mb-5'>
				<Form.Group className='col-md-6'>
					<Form.Label>Название</Form.Label>
					<Form.Control
						type='text'
						placeholder='Название'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='col-md-6'>
					<Form.Label>URL изображения</Form.Label>
					<Form.Control
						type='text'
						placeholder='URL изображения'
						value={imageUrl}
						onChange={e => setImageUrl(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='col-md-4'>
					<Form.Label>Тип</Form.Label>
					<Form.Select value={type} onChange={e => setType(e.target.value)}>
						<option value='enterprise'>Предприятия</option>
						<option value='product'>Продукция</option>
						<option value='news'>Новости</option>
					</Form.Select>
				</Form.Group>
				{type === 'product' && (
					<>
						<Form.Group className='col-md-4'>
							<Form.Label>Предприятие</Form.Label>
							<Form.Select
								value={enterpriseId}
								onChange={e => setEnterpriseId(e.target.value)}
							>
								<option value=''>Выберите предприятие</option>
								{enterprises.map(enterprise => (
									<option key={enterprise.id} value={enterprise.id}>
										{enterprise.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Производитель</Form.Label>
							<Form.Control
								type='text'
								placeholder='Производитель'
								value={manufacturer}
								onChange={e => setManufacturer(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Срок годности</Form.Label>
							<Form.Control
								type='text'
								placeholder='Срок годности'
								value={shelfLife}
								onChange={e => setShelfLife(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Белки</Form.Label>
							<Form.Control
								type='text'
								placeholder='Белки'
								value={proteins}
								onChange={e => setProteins(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Жиры</Form.Label>
							<Form.Control
								type='text'
								placeholder='Жиры'
								value={fats}
								onChange={e => setFats(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Углеводы</Form.Label>
							<Form.Control
								type='text'
								placeholder='Углеводы'
								value={carbs}
								onChange={e => setCarbs(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Вес</Form.Label>
							<Form.Control
								type='text'
								placeholder='Вес'
								value={weight}
								onChange={e => setWeight(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Условия хранения</Form.Label>
							<Form.Control
								type='text'
								placeholder='Условия хранения'
								value={storage}
								onChange={e => setStorage(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='col-md-4'>
							<Form.Label>Энергетическая ценность</Form.Label>
							<Form.Control
								type='text'
								placeholder='Энергетическая ценность'
								value={energy}
								onChange={e => setEnergy(e.target.value)}
							/>
						</Form.Group>
					</>
				)}
				<Form.Group className='col-md-8'>
					<Form.Label>Описание</Form.Label>
					<Form.Control
						as='textarea'
						placeholder='Описание (для новостей и предприятий)'
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</Form.Group>
				<div className='col-12'>
					<Button type='submit' variant='primary'>
						Добавить
					</Button>
				</div>
			</Form>

			<div
				className='modal fade'
				id='editModal'
				tabIndex='-1'
				aria-labelledby='editModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-lg'>
					<div className='modal-content'>
						{editingSlide && (
							<Form onSubmit={handleUpdate}>
								<div className='modal-header'>
									<h5 className='modal-title' id='editModalLabel'>
										Редактировать слайд
									</h5>
									<Button
										type='button'
										className='btn-close'
										data-bs-dismiss='modal'
										aria-label='Close'
										onClick={() => setEditingSlide(null)}
									></Button>
								</div>
								<div className='modal-body'>
									<Form.Group className='mb-3'>
										<Form.Label>Название</Form.Label>
										<Form.Control
											type='text'
											placeholder='Название'
											value={editingSlide.title}
											onChange={e =>
												setEditingSlide({
													...editingSlide,
													title: e.target.value,
												})
											}
											required
										/>
									</Form.Group>
									<Form.Group className='mb-3'>
										<Form.Label>URL изображения</Form.Label>
										<Form.Control
											type='text'
											placeholder='URL изображения'
											value={editingSlide.imageUrl}
											onChange={e =>
												setEditingSlide({
													...editingSlide,
													imageUrl: e.target.value,
												})
											}
											required
										/>
									</Form.Group>
									<Form.Group className='mb-3'>
										<Form.Label>Тип</Form.Label>
										<Form.Select
											value={editingSlide.type}
											onChange={e =>
												setEditingSlide({
													...editingSlide,
													type: e.target.value,
												})
											}
										>
											<option value='enterprise'>Предприятия</option>
											<option value='product'>Продукция</option>
											<option value='news'>Новости</option>
										</Form.Select>
									</Form.Group>
									{editingSlide.type === 'product' && (
										<>
											<Form.Group className='mb-3'>
												<Form.Label>Предприятие</Form.Label>
												<Form.Select
													value={editingSlide.enterpriseId || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															enterpriseId: e.target.value,
														})
													}
												>
													<option value=''>Выберите предприятие</option>
													{enterprises.map(enterprise => (
														<option key={enterprise.id} value={enterprise.id}>
															{enterprise.name}
														</option>
													))}
												</Form.Select>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Производитель</Form.Label>
												<Form.Control
													type='text'
													placeholder='Производитель'
													value={editingSlide.manufacturer || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															manufacturer: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Срок годности</Form.Label>
												<Form.Control
													type='text'
													placeholder='Срок годности'
													value={editingSlide.shelfLife || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															shelfLife: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Белки</Form.Label>
												<Form.Control
													type='text'
													placeholder='Белки'
													value={editingSlide.proteins || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															proteins: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Жиры</Form.Label>
												<Form.Control
													type='text'
													placeholder='Жиры'
													value={editingSlide.fats || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															fats: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Углеводы</Form.Label>
												<Form.Control
													type='text'
													placeholder='Углеводы'
													value={editingSlide.carbs || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															carbs: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Вес</Form.Label>
												<Form.Control
													type='text'
													placeholder='Вес'
													value={editingSlide.weight || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															weight: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Условия хранения</Form.Label>
												<Form.Control
													type='text'
													placeholder='Условия хранения'
													value={editingSlide.storage || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															storage: e.target.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group className='mb-3'>
												<Form.Label>Энергетическая ценность</Form.Label>
												<Form.Control
													type='text'
													placeholder='Энергетическая ценность'
													value={editingSlide.energy || ''}
													onChange={e =>
														setEditingSlide({
															...editingSlide,
															energy: e.target.value,
														})
													}
												/>
											</Form.Group>
										</>
									)}
									<Form.Group className='mb-3'>
										<Form.Label>Описание</Form.Label>
										<Form.Control
											as='textarea'
											placeholder='Описание'
											value={editingSlide.description || ''}
											onChange={e =>
												setEditingSlide({
													...editingSlide,
													description: e.target.value,
												})
											}
										/>
									</Form.Group>
								</div>
								<div className='modal-footer'>
									<Button
										type='button'
										variant='secondary'
										data-bs-dismiss='modal'
										onClick={() => setEditingSlide(null)}
									>
										Отмена
									</Button>
									<Button
										type='submit'
										variant='success'
										data-bs-dismiss='modal'
									>
										Сохранить
									</Button>
								</div>
							</Form>
						)}
					</div>
				</div>
			</div>

			{renderSlider('enterprise')}
			{renderSlider('product')}
			{renderSlider('news')}
		</div>
	)
}
