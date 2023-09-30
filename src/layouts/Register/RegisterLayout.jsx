import classNames from 'classnames/bind';

import styles from './RegisterLayout.module.scss';

const cx = classNames.bind(styles);
function OtherLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-login')}>
                <img
                    className={cx('header-login-logo')}
                    src="https://cdn.monday.com/images/logos/monday_logo_short.png"
                    alt=""
                ></img>
            </div>
            {children}
        </div>
    );
}
export default OtherLayout;
