import classNames from 'classnames/bind';

import styles from './Logo.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Logo({ title, children, small, href }) {
    return (
        <div className={cx('logo')}>
            {href ? (
                <a className={cx('logo-icon', { small })} href={href}>
                    <img src={images.logo} alt="" />
                </a>
            ) : (
                <img className={cx('logo-icon', { small })} src={images.logo} alt="" />
            )}
            <div className={cx('about-app')}>
                {title && <h3 className={cx('app-name')}>{title}</h3>}
                <span className={cx('app-description', { small })}>{children}</span>
            </div>
        </div>
    );
}

export default Logo;
