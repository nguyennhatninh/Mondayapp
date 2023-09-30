import classNames from 'classnames/bind';

import styles from './TaskBoardList.module.scss';

const cx = classNames.bind(styles);

function TaskBoardList({ children }) {
    return <div className={cx('task-board-list')}>{children}</div>;
}
export default TaskBoardList;
