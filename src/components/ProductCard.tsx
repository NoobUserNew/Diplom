import { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import styles from '../styles/ProductCard.module.scss'

interface Product {
  name: string
  image_url?: string
  manufacturer?: string
  shelf_life?: string
  proteins?: string
  fats?: string
  carbs?: string
  weight?: string
  energy?: string
  storage?: string
  description?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <Card className={styles.cardWrapper}>
        {/* 1. Блок с картинкой */}
        <div className={styles.cardImageWrapper}>
          <Card.Img
            className={styles.cardImg}
            variant='top'
            src={product.image_url}
            alt={product.name}
          />
        </div>

        {/* 2. Тело карточки */}
        <Card.Body className={styles.cardBody}>
          {/* 2.1. Заголовок (название товара) */}
          <Card.Title className={styles.cardTitle} title={product.name}>
            {product.name.length > 30
              ? product.name.substring(0, 30) + '…'
              : product.name}
          </Card.Title>

          {/* 2.2. Кнопка «Подробнее» для открытия модалки */}
          <Button
            variant='none'
            className={styles.openModalButton}
            onClick={openModal}
          >
            <BsArrowsAngleExpand className={styles.openIcon} />
            Подробнее
          </Button>
        </Card.Body>
      </Card>

      {/* 3. Кастомная модалка со всеми данными */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        backdrop='static'
        keyboard={true}
        dialogClassName={styles.customModalDialog}
        contentClassName={styles.customModalContent}
        className='fade'
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            {product.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          {/* Изображение внутри модалки */}
          {product.image_url && (
            <div className={styles.modalImageWrapper}>
              <img
                src={product.image_url}
                alt={product.name}
                className={styles.modalImg}
              />
            </div>
          )}

          {/* Список базовых характеристик */}
          <ul className={styles.modalInfoList}>
            {product.manufacturer && (
              <li>
                <span className={styles.label}>Произв.:</span>
                <span className='value'>{product.manufacturer}</span>
              </li>
            )}
            {product.shelf_life && (
              <li>
                <span className={styles.label}>Срок годности:</span>
                <span className='value'>{product.shelf_life}</span>
              </li>
            )}

            {/* ОДИН <li> для всей группы БЖУ */}
            {(product.proteins || product.fats || product.carbs) && (
              <li className={styles.macroGroup}>
                {product.proteins && (
                  <div className={styles.macroItem}>
                    <span className={styles.label}>Белки:</span>
                    <span className='value'>{product.proteins}</span>
                  </div>
                )}
                {product.fats && (
                  <div className={styles.macroItem}>
                    <span className={styles.label}>Жиры:</span>
                    <span className='value'>{product.fats}</span>
                  </div>
                )}
                {product.carbs && (
                  <div className={styles.macroItem}>
                    <span className={styles.label}>Углеводы:</span>
                    <span className='value'>{product.carbs}</span>
                  </div>
                )}
              </li>
            )}

            {product.weight && (
              <li>
                <span className={styles.label}>Масса:</span>
                <span className='value'>{product.weight}</span>
              </li>
            )}
            {product.energy && (
              <li>
                <span className={styles.label}>Энерг. ценность:</span>
                <span className='value'>{product.energy}</span>
              </li>
            )}
            {product.storage && (
              <li>
                <span className={styles.label}>Хранение:</span>
                <span className='value'>{product.storage}</span>
              </li>
            )}
          </ul>

          {/* Полное описание */}
          {product.description && (
            <p className={styles.modalDescription}>{product.description}</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
