import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/actions';

const cx = classNames.bind(styles);

function Menu() {
    const [name, setName] = useState('');
    const access_token = localStorage.getItem('access_token');
    const dispatch = useDispatch();
    const handelGetInfoUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/user/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const data = await response.data.data;
            return data;
        } catch (e) {
            handleLogout();
        }
    };
    useEffect(() => {
        async function fetchData() {
            const info = await handelGetInfoUser();
            setName(info?.name);
        }
        fetchData();
    }, []);
    const handleLogout = () => {
        window.location.href = '/';
        localStorage.removeItem('access_token');
        dispatch(logout(false));
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
