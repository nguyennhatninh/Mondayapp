import classNames from 'classnames/bind';
import React from 'react';
import styles from './RequireLogin.module.scss';

const cx = classNames.bind(styles);

function RequireLogin({ show }) {
    const isLogin = !!localStorage.getItem('access_token');

    if (!isLogin) {
        return (
            <div className={cx('overlay', { show })}>
                <div className={cx('login-message')}>
                    <h3>You need to log in to continue</h3>
                    <a className={cx('login-message-button')} href="/login">
                        Login
                    </a>
                </div>
            </div>
        );
    }
}

export default RequireLogin;
