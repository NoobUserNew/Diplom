// components/BackButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/HomeButton.module.scss';

const HomeButton = ({ href = '/', children = 'Назад к главной', ...props }) => {
  return (
    <a href={href} className={styles['back-button']} {...props}>
      {children}
    </a>
  );
};

HomeButton.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default HomeButton;
