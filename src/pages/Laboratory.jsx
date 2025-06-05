// src/components/Laboratory.jsx
import {
	FaAppleAlt,
	FaCheese,
	FaFish,
	FaFlask,
	FaWineBottle,
} from 'react-icons/fa'
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from '../styles/Laboratory.module.scss'

function Laboratory() {
	return (
		<div className={styles.laboratory}>
			<div className={styles.container}>
				<Header />

				<h1 className={styles.title}>Лаборатория</h1>

				<div className={styles.content}>
					<p>
						Лаборатория проводит испытания продовольственного сырья, продуктов
						питания по органолептическим, физико-химическим показателям,
						показателям безопасности и радиометрическому контролю, в
						соответствии с утвержденной областью аккредитации. Испытания
						проводятся на соответствие ТНПА, действующих на территории
						Республики Беларусь (ГОСТ, СТБ, ГОСТ Р), а также технических
						регламентов Республики Беларусь и Таможенного союза.
					</p>

					<p>Производственная лаборатория:</p>
					<ul>
						<li>
							аккредитована в Национальной системе аккредитации Республики
							Беларусь на техническую компетентность и независимость по СТБ
							ISO/МЭК 17025-2007;
						</li>
						<li>
							Аттестат аккредитации № BY/112 02.1.0.1037 от 25.08.1997 г.;
						</li>
						<li>
							включена в Единый реестр органов по сертификации и испытательных
							лабораторий (центров) Таможенного союза.
						</li>
					</ul>

					<p>Информация для заказчиков, заинтересованных в сотрудничестве:</p>
					<p>
						Заключить договор на испытания, получить консультацию можно по
						адресу г. Брест, ул. Карбышева, 119, производственная лаборатория (1
						этаж) или по телефонам 20-46-61, 20-05-92.
					</p>
				</div>

				{/* Раздел «Область аккредитации» в виде карточек */}
				<div className={styles['info-section']}>
					<div className={styles['info-card']}>
						<div className={styles['icon-wrapper']}>
							<FaFlask />
						</div>
						<h3>Мясо и мясные продукты</h3>
						<p className={styles.pInSection}>
							Физико-химические показатели, токсичные элементы, пестициды,
							удельная активность радионуклидов Cs-137 и Sr-90.
						</p>
					</div>

					<div className={styles['info-card']}>
						<div className={styles['icon-wrapper']}>
							<FaCheese />
						</div>
						<h3>Молоко и молочная продукция</h3>
						<p className={styles.pInSection}>
							Физико-химические показатели, токсичные элементы, микотоксины,
							пестициды, объемная активность Cs-137 и Sr-90.
						</p>
					</div>

					<div className={styles['info-card']}>
						<div className={styles['icon-wrapper']}>
							<FaFish />
						</div>
						<h3>Рыба и рыбные продукты</h3>
						<p className={styles.pInSection}>
							Органолептические, физико-химические, паразитологическая
							экспертиза, гистамин, токсичные элементы, пестициды, удельная
							активность Cs-137 и Sr-90.
						</p>
					</div>

					<div className={styles['info-card']}>
						<div className={styles['icon-wrapper']}>
							<FaWineBottle />
						</div>
						<h3>Напитки</h3>
						<p className={styles.pInSection}>
							Токсичные элементы, удельная активность Cs-137 и Sr-90:
							алкогольные, слабоалкогольные и безалкогольные.
						</p>
					</div>

					<div className={styles['info-card']}>
						<div className={styles['icon-wrapper']}>
							<FaAppleAlt />
						</div>
						<h3>Плодоовощная продукция и детское питание</h3>
						<p className={styles.pInSection}>
							Токсичные элементы, микотоксины, пестициды, нитраты, объемная
							активность Cs-137 и Sr-90.
						</p>
					</div>

					{/* Добавьте остальные карточки по аналогии */}
				</div>

				{/* Раздел с перечнем ссылок на технические регламенты */}
				<div className={styles.content}>
					<h3>
						Испытательная лаборатория аккредитована на проведение испытаний:
					</h3>
					<ul>
						<li>
							<a
								href='https://64.fsvps.gov.ru/files/reshenie-komissii-tamozhennogo-sojuza-ot-9-dekabrja-2011-g-n-880-o-prinjatii-tehnicheskogo-reglamenta-tamozhennogo-sojuza-o-bezopasnosti-pishhevoj-produkcii-s-izm-ot-22-aprelja-2024-g/'
								target='_blank'
								rel='noopener noreferrer'
							>
								ТР ТС 021/2011 «О безопасности пищевой продукции»
							</a>
						</li>
						<li>
							<a
								href='https://eec.eaeunion.org/comission/department/deptexreg/tr/MasloGirov.php'
								target='_blank'
								rel='noopener noreferrer'
							>
								ТР ТС 024/2011 «Технический регламент на масложировую
							</a>
						</li>
						<li>
							<a
								href='https://eec.eaeunion.org/upload/medialibrary/789/TR-TS-033_2013.pdf'
								target='_blank'
								rel='noopener noreferrer'
							>
								ТР ТС 033/2013 «О безопасности молока и молочной продукции»
							</a>
						</li>
						<li>
							<a
								href='https://rostest.net/wp-content/uploads/2014/10/TR-TS-034-2013-O-bezopasnosti-myasa-i-myasnoi-produktsii.pdf'
								target='_blank'
								rel='noopener noreferrer'
							>
								ТР ТС 034/2013 «О безопасности мяса и мясной продукции»
							</a>
						</li>
						<li>
							<a
								href='https://files.stroyinf.ru/Data2/1/4293745/4293745761.pdf'
								target='_blank'
								rel='noopener noreferrer'
							>
								ТР ЕАЭС 040/2016 «О безопасности рыбы и рыбной продукции»
							</a>
						</li>
					</ul>
				</div>

				<a href='/' className={styles['back-button']}>
					Назад к главной
				</a>

				<Footer />
			</div>
		</div>
	)
}

export default Laboratory
