import { Col } from 'react-bootstrap'
import styles from '../styles/ProductGrid.module.scss'
import  ProductCard from './ProductCard.tsx'

export default function ProductGrid({ products }) {
	if (products.length === 0) {
		return (
			<Col>
				<p className={styles.noProductsMessage}>
					Пока нет доступных продуктов.
				</p>
			</Col>
		)
	}

	return (
		<>
			{products.map(prod => (
				<Col key={prod.id} className={styles.colWrapper}>
					<ProductCard product={prod} />
				</Col>
			))}
		</>
	)
}
