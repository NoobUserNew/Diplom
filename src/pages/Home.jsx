import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Home.module.scss'

export default function Home() {
	const [slides, setSlides] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		fetch('{$API_URL}/sliders')
			.then(res => res.json())
			.then(data => setSlides(data))
	}, [])

	const renderSlider = type => (
		<Swiper
			pagination={{ clickable: true }}
			navigation={true}
			modules={[Pagination, Navigation]}
			className={styles.swiperContainer}
			slidesPerView={1}
			spaceBetween={20}
			breakpoints={{
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
			}}
		>
			{slides
				.filter(slide => slide.type === type)
				.slice(0, type === 'product' ? 7 : undefined)
				.map(slide => (
					<SwiperSlide key={slide.id}>
						<div className={styles.slideCard}>
							<img
								src={slide.imageUrl}
								alt={slide.title}
								className={styles.cardImage}
							/>
							<h3 className={styles.cardTitle}>
								{type === 'news' ? (
									<Link to={`/news/${slide.id}`}>
										{slide.title.length > 50
											? slide.title.slice(0, 22) + '...'
											: slide.title}
									</Link>
								) : (
									<>
										{slide.title.length > 50
											? slide.title.slice(0, 22) + '...'
											: slide.title}
									</>
								)}
							</h3>
							{slide.description && (
								<p className={styles.cardDescription}>
									{slide.description.length > 40
										? slide.description.slice(0, 40) + '...'
										: slide.description}
								</p>
							)}
						</div>
					</SwiperSlide>
				))}
		</Swiper>
	)

	return (
		<div className={styles.homeContainer}>
			{/* Hero-блок с большой заставкой */}
			<section className={styles.heroSection}>
				<div className='overlay'></div>
				<div className={styles.heroContent}>
					<h1>Коммунальное унитарное предприятие по оказанию услуг «Управляющая компания холдинга «Брестоблхлебопродукт»</h1>
					<p>
						Мы производим высококачественные товары для самых разных отраслей и
						постоянно развиваемся, чтобы радовать вас новыми решениями.
					</p>
					{/* <Link to='/about' className={`ctaButton ${styles.ctaButton}`}>
						Подробнее о нас
					</Link> */}
				</div>
			</section>

			<div className={styles.mainContent}>
				{/* Секция "О компании" */}
				<section className={styles.aboutSection}>
					<h2 className={styles.sectionHeading}>О компании</h2>
					<p className={styles.sectionDescription}>
						Наша компания специализируется на производстве высококачественной
						продукции для различных отраслей. Мы ценим каждого клиента и
						гарантируем надёжность в каждом изделии.
					</p>
					<Link to='/about' className={styles.actionButton}>
						Узнать больше
					</Link>
				</section>
				<section className={styles.Header}>
					<Header />
				</section>
				{/* Секция "Предприятия" */}
				<section className={styles.sectionContainer}>
					<h2 className={styles.sectionHeading}>Предприятия</h2>
					<p className={styles.sectionDescription}>
						Познакомьтесь с нашими предприятиями, их историями и
						производственными мощностями. Мы гордимся тем, что используем
						современные технологии.
					</p>
					{renderSlider('enterprise')}
					<button
						className={styles.actionButton}
						onClick={() => navigate('/enterprises/')}
					>
						Подробнее
					</button>
				</section>

				{/* Секция "Продукция" */}
				<section className={styles.sectionContainer}>
					<h2 className={styles.sectionHeading}>Продукция</h2>
					<p className={styles.sectionDescription}>
						Ознакомьтесь с широким ассортиментом нашей продукции: от сырья до
						готовых изделий, которые находят применение по всему миру.
					</p>
					{renderSlider('product')}
					<button
						className={styles.actionButton}
						onClick={() => navigate('/products/')}
					>
						Подробнее
					</button>
				</section>

				{/* Секция "Новости" */}
				<section className={styles.sectionContainer}>
					<h2 className={styles.sectionHeading}>Новости</h2>
					<p className={styles.sectionDescription}>
						Читайте последние новости и достижения нашей компании: новые
						проекты, внедрённые инновации и пресс-релизы.
					</p>
					{renderSlider('news')}
					<button
						className={styles.actionButton}
						onClick={() => navigate('/news/')}
					>
						Подробнее
					</button>
				</section>

				<Footer />
			</div>

			{/* Декоративные круги */}
			<div
				className={`${styles['decorative-bg']} ${styles.topLeftCircle}`}
			></div>
			<div
				className={`${styles['decorative-bg']} ${styles.bottomRightCircle}`}
			></div>
		</div>
	)
}
