import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

function RegisterSupport({ children, link, otherLink, href, otherHref }) {
    return (
        <div className={cx('register-support')}>
            {otherLink && (
                <a className={cx('register-support-link')} href={otherHref}>
                    {otherLink}
                </a>
            )}
            <span>{children}</span>
            <a className={cx('register-support-link')} href={href}>
                {link}
            </a>
        </div>
    );
}

export default RegisterSupport;
