// src/pages/Contacts.jsx
import Footer from '../components/Footer'
import Header from '../components/Header'
import HomeButton from '../components/HomeButton'
import styles from '../styles/Contacts.module.scss'

export default function Contacts() {
	return (
		<div className={styles.contactsPage}>
			<Header />

			{/* Секция с фоном здания и контактной информацией */}
			<section className={styles.contactSection}>
				<div className={styles.overlay} />
				<div className={styles.content}>
					<h1 className={styles.title}>Контакты</h1>
					<p className={styles.phone}>+375 16 237-00-70</p>
					<p className={styles.address}>г. Брест, ул. Наганова, 10</p>
					<p className={styles.description}>
						Мы всегда рады видеть вас в нашем офисе. Позвоните нам или приходите
						в удобное время — будем рады помочь с любыми вопросами!
					</p>
				</div>
			</section>
			<div className={styles.wrapperButton}>
				<HomeButton href='/' />
			</div>

			<Footer />
		</div>
	)
}
