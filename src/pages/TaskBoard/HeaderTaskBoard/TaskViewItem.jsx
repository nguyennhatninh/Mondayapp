import classNames from 'classnames/bind';

import styles from './TaskViewItem.module.scss';
import Tippy from '@tippyjs/react';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function TaskViewItem({ leftIcon, rightIcon, children, index, isActive, onClick }) {
    const active = isActive ? true : false;
    const first = index === 0 ? true : false;
    return (
        <div className={cx('task-view-wrapper')} onClick={() => onClick(index)}>
            <div className={cx('task-view-inner')}>
                <div className={cx('task-view-item', { first })}>
                    {index === 0 && <img className={cx('image')} src={images.homeIcon} alt="" />}
                    {leftIcon && <img className={cx('icon')} src={leftIcon} alt="" />}
                    <Tippy content={children}>
                        <div className={cx('view-item-content')}>{children}</div>
                    </Tippy>
                    {rightIcon && <img className={cx('icon')} src={rightIcon} alt="" />}
                </div>
                {<div className={cx('line')}></div>}
            </div>
            {active && <div className={cx('active')}></div>}
        </div>
    );
}

export default TaskViewItem;
