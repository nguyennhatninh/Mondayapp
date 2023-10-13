import classNames from 'classnames/bind';

import styles from './TaskTool.module.scss';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function TaskToolItem({ leftIcon, rightIcon, children, active }) {
    return (
        <div className={cx('task-tool-item', { active })}>
            {leftIcon && <img className={cx('icon')} src={leftIcon} alt="" />}
            <Tippy content={children}>
                <div>{children}</div>
            </Tippy>
            {rightIcon && <img className={cx('icon')} src={rightIcon} alt="" />}
        </div>
    );
}

export default TaskToolItem;
