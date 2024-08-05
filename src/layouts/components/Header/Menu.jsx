import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';

import styles from './Header.module.scss';
import { logout } from '~/redux/actions';
import axiosInstance from '~/axiosConfig';

const cx = classNames.bind(styles);

function Menu() {
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    let decoded;
    accessToken && (decoded = jwtDecode(accessToken));
    const name = decoded?.username;

    const handleLogout = async () => {
        localStorage.removeItem('accessToken');
        await axiosInstance.post('/auth/logout', { refreshToken });
        localStorage.removeItem('refreshToken');
        dispatch(logout(false));
        window.location.href = '/';
    };
    return (
        <div className={cx('menu')}>
            <div className={cx('menu-title')}>
                <img src="https://cdn.monday.com/images/logos/monday_logo_icon.png" alt="" />
                <div className={cx('menu-name-user')}>{`${name}'s Team`}</div>
            </div>
            <div className={cx('menu-item')}>
                <FontAwesomeIcon icon={faUser} />
                <div className={cx('menu-item-title')}>My profile</div>
            </div>
            <div className={cx('menu-item')}>
                <FontAwesomeIcon icon={faTrashCan} />
                <div className={cx('menu-item-title')}>Trash</div>
            </div>
            <div className={cx('menu-item')} onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignIn} />
                <div className={cx('menu-item-title')}>Logout</div>
            </div>
        </div>
    );
}

export default Menu;
