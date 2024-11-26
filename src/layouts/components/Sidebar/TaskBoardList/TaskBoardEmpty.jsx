import classNames from 'classnames/bind';

import styles from './TaskBoardList.module.scss';

const cx = classNames.bind(styles);

function TaskBoardEmpty({ tables }) {
    return (
        <div className={cx('task-board-empty', { tables })}>
            <img src="https://cdn.monday.com/images/search_empty_state.svg" alt="" />
            <div className={cx('board-empty-title')}>No results found</div>
            <div className={cx('board-empty-solution')}>{'Please check your search terms or filters.'}</div>
        </div>
    );
}

export default TaskBoardEmpty;
