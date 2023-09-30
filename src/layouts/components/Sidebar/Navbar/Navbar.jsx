import classNames from 'classnames/bind';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar({ children }) {
    return <nav className={cx('navbar')}>{children}</nav>;
}

export default Navbar;
