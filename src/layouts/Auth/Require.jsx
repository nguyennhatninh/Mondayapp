import classNames from 'classnames/bind';
import React from 'react';
import styles from './Require.module.scss';
import { requireLogin, requireOther } from '~/redux/actions';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Require({ show, description, button }) {
    const dispatch = useDispatch();
    const isLogin = !!localStorage.getItem('accessToken');
    const handleHideOverlay = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(requireLogin(false));
            dispatch(requireOther(false));
        }
    };
    const handleChangeWindow = () => {
        window.location.href = '/login';
        if (button === 'Close') {
            window.close();
        }
    };
    if (!isLogin) {
        return (
            <div className={cx('overlay', { show })} onClick={handleHideOverlay}>
                <div className={cx('login-message')}>
                    <h3>{description}</h3>
                    <div className={cx('login-message-button')} onClick={handleChangeWindow}>
                        {button}
                    </div>
                </div>
            </div>
        );
    }
}

export default Require;
