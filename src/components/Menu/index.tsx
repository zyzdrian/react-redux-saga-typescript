import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.scss';

const Menu = () => (
    <div className={styles.root}>
        <Link to='/' className={styles.item}>
            Home
        </Link>
        <Link to='/add-post' className={styles.item}>
            Add Post
        </Link>
    </div>
);

export default Menu;
