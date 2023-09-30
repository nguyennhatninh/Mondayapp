import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

function LoginSupport({ children, link, otherLink, href, otherHref }) {
    return (
        <div className={cx('login-support')}>
            {otherLink && (
                <a className={cx('login-support-link')} href={otherHref}>
                    {otherLink}
                </a>
            )}
            <span>{children}</span>
            <a className={cx('login-support-link')} href={href}>
                {link}
            </a>
        </div>
    );
}

export default LoginSupport;
