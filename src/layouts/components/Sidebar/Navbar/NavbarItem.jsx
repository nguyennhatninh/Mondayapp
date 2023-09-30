import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function NavbarItem({ icon, children, to }) {
    return (
        <NavLink className={(nav) => cx('navbar-item', { active: nav.isActive })} to={to}>
            {icon && <img src={icon} alt="" />}
            {children}
        </NavLink>
    );
}

export default NavbarItem;
