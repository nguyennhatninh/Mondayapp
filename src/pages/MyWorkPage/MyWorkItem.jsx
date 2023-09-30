import classNames from 'classnames/bind';
import styles from './MyWorkPage.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
function MyWorkItem({ icon, children, title, items }) {
    const [show, setShow] = useState(children ? true : false);
    const handleShowChildren = () => {
        setShow(!show);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('work-page-item')}>
                <img onClick={handleShowChildren} className={cx('arrow-down-icon', { show })} src={icon} alt=""></img>
                {`${title} /`}
                <div className={cx('work-page-item-count')}>{items !== 1 ? `${items} items` : `${items} item`}</div>
            </div>
            <div className={cx('children', { show })}>{show && children}</div>
        </div>
    );
}

export default MyWorkItem;
