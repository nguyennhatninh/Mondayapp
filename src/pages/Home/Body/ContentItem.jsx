import classNames from 'classnames/bind';
import styles from './Body.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
function ContentItem({ icon, children, title, notify, iconRight }) {
    const [show, setShow] = useState(true);
    const handleShowChildren = () => {
        setShow(!show);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-item')}>
                <img onClick={handleShowChildren} className={cx('arrow-down-icon', { show })} src={icon} alt=""></img>
                {title}
                {notify && <div className={cx({ notify })}>{'1'}</div>}
                {iconRight && <img className={cx({ iconRight })} src={iconRight} alt="" />}
            </div>
            <div className={cx('children', { show })}>{show && children}</div>
        </div>
    );
}

export default ContentItem;
