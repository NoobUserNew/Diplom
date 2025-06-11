import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { IoSearchSharp } from 'react-icons/io5';
import styles from '../styles/SearchSortBar.module.scss';

/**
 * Параметры:
 *   searchName            – текущая строка поиска по name
 *   setSearchName         – сеттер для searchName
 *   onSearchClick(value)  – колбэк, вызывается при клике на 🔍, в value передаём новую строку
 *   manufacturers         – массив уникальных manufacturer (строки), хотя бы []
 *   manufacturerFilter    – текущее значение фильтра: null | 'NO_MANUFACTURER' | строка
 *   setManufacturerFilter – сеттер для manufacturerFilter
 *   sortOrder             – null | 'asc' | 'desc'
 *   setSortOrder          – сеттер для sortOrder
 */
export default function SearchSortBar({
  searchName,
  setSearchName,
  onSearchClick,
  manufacturers = [],
  manufacturerFilter,
  setManufacturerFilter,
  sortOrder,
  setSortOrder,
}) {
  // Локальное поле ввода, чтобы не менять searchName сразу при наборе
  const [localSearch, setLocalSearch] = useState(searchName || '');

  const handleSearchSubmit = () => {
    onSearchClick(localSearch.trim());
  };

  return (
    <Row className={styles.searchSortRow}>
      {/* 1. Поле поиска по name */}
      <Col xs={12} md={4} className={styles.searchCol}>
        <InputGroup className={styles.searchInputGroup}>
          <Form.Control
            className={styles.searchInput}
            type="text"
            placeholder="Введите название..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
          />
          <Button
            variant="outline-secondary"
            onClick={handleSearchSubmit}
            className={styles.searchButton}
          >
            <IoSearchSharp size={20} />
          </Button>
        </InputGroup>
      </Col>

      {/* 2. Dropdown-фильтр по manufacturer */}
      <Col xs={12} md={4} className={styles.filterCol}>
        <InputGroup className={styles.filterInputGroup}>
          <InputGroup.Text className={styles.inputGroupText}>
            Фильтр:
          </InputGroup.Text>
          <DropdownButton
            as={ButtonGroup}
            variant="outline-secondary"
            title={
              manufacturerFilter === null
                ? 'Все производители'
                : manufacturerFilter === 'NO_MANUFACTURER'
                ? 'Без производителя'
                : manufacturerFilter
            }
            id="manufacturer-filter-dropdown"
            className={styles.dropdownButton}
          >
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => setManufacturerFilter(null)}
            >
              Все производители
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => setManufacturerFilter('NO_MANUFACTURER')}
            >
              Без производителя
            </Dropdown.Item>
            <Dropdown.Divider />
            {manufacturers.map((mfg) => (
              <Dropdown.Item
                key={mfg}
                className={styles.dropdownItem}
                onClick={() => setManufacturerFilter(mfg)}
              >
                {mfg}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup>
      </Col>

      {/* 3. Dropdown-сортировка по manufacturer */}
      <Col xs={12} md={4} className={styles.sortCol}>
        <InputGroup className={styles.sortInputGroup}>
          <InputGroup.Text className={styles.inputGroupText}>
            Сортировка:
          </InputGroup.Text>
          <DropdownButton
            as={ButtonGroup}
            variant="outline-secondary"
            title={
              sortOrder === 'asc'
                ? 'A→Я'
                : sortOrder === 'desc'
                ? 'Я→A'
                : 'Без сортировки'
            }
            id="sort-manufacturer-dropdown"
            className={styles.dropdownButton}
          >
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => setSortOrder(null)}
            >
              Без сортировки
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => setSortOrder('asc')}
            >
              По производителю A→Я
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropdownItem}
              onClick={() => setSortOrder('desc')}
            >
              По производителю Я→A
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </Col>
    </Row>
  );
}
