import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import styles from './TaskTool.module.scss';
import { dueDateFilter, groupFilter, statusFilter } from '~/redux/actions';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function FilterTool({ indexTB }) {
    const titleTable = JSON.parse(localStorage.getItem(`tables${indexTB}`));
    const dueDateItems = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month'];
    const status = ['Done', 'Working on it', 'Stuck', 'Not Started'];

    const [indexFilter, setIndexFilter] = useState({ group: null, date: null, status: null });

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(groupFilter({ indexTB: null, index: null }));
            dispatch(dueDateFilter({ indexTB: null, value: null }));
            dispatch(statusFilter({ indexTB: null, value: null }));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGroupFilter = (index) => {
        setIndexFilter((prev) => ({ ...prev, group: index }));
        dispatch(groupFilter({ indexTB: indexTB, index: index }));
        if (indexFilter.group === index) {
            setIndexFilter((prev) => ({ ...prev, group: null }));
            dispatch(groupFilter({ indexTB: null, index: null }));
        }
    };

    const handleDueDateFilter = (index) => {
        setIndexFilter((prev) => ({ ...prev, date: index }));
        dispatch(dueDateFilter({ indexTB: indexTB, value: dueDateItems[index] }));
        if (indexFilter.date === index) {
            setIndexFilter((prev) => ({ ...prev, date: null }));
            dispatch(dueDateFilter({ indexTB: null, value: null }));
        }
    };

    const handleStatusFilter = (index) => {
        setIndexFilter((prev) => ({ ...prev, status: index }));
        dispatch(statusFilter({ indexTB: indexTB, value: status[index] }));
        if (indexFilter.status === index) {
            setIndexFilter((prev) => ({ ...prev, status: null }));
            dispatch(statusFilter({ indexTB: null, value: null }));
        }
    };
    return (
        <div className={cx('tool-filter')}>
            <div>
                <div className={cx('tool-filter-title')}>Group</div>
                <div>
                    {titleTable.map((item, index) => (
                        <div
                            key={index}
                            className={cx('tool-filter-item', indexFilter.group === index && 'active')}
                            onClick={() => handleGroupFilter(index)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className={cx('tool-filter-title')}>Due Date</div>
                <div>
                    {dueDateItems.map((item, index) => (
                        <div
                            key={index}
                            className={cx('tool-filter-item', indexFilter.date === index && 'active')}
                            onClick={() => handleDueDateFilter(index)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className={cx('tool-filter-title')}>Status</div>
                <div>
                    {status.map((item, index) => (
                        <div
                            key={index}
                            className={cx('tool-filter-item', indexFilter.status === index && 'active')}
                            onClick={() => handleStatusFilter(index)}
                        >
                            <div className={cx(`color${index}`)}></div>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterTool;
