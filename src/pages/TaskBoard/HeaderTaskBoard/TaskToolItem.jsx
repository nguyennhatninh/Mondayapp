import classNames from 'classnames/bind';

import styles from './TaskTool.module.scss';
import Tippy from '@tippyjs/react';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TaskToolItem({ leftIcon, rightIcon, children }) {
    const [active, setActive] = useState(false);
    return (
        <div
            className={cx('task-tool-item', { active })}
            onClick={() => setActive(true)}
            tabIndex="0"
            onBlur={() => setActive(false)}
        >
            {leftIcon && <img className={cx('icon')} src={leftIcon} alt="" />}
            <Tippy content={children}>
                <div>{children}</div>
            </Tippy>
            {rightIcon && <img className={cx('icon')} src={rightIcon} alt="" />}
        </div>
    );
}

export default TaskToolItem;
