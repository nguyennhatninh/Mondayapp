import classNames from 'classnames/bind';

import styles from './TaskTool.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterDate, filterGroup, filterStatus, requireLogin } from '~/redux/actions';

const cx = classNames.bind(styles);

function FilterTool({ tables }) {
    const dispatch = useDispatch();
    const isLogin = !!localStorage.getItem('accessToken');
    const initGroup = [{ name: 'Table Title 1' }, { name: 'Table Title 2' }];
    let groups = isLogin ? tables : initGroup;
    const dueDateItems = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month'];
    const dueDateQuery = ['overdue', 'today', 'tomorrow', 'this_week', 'next_week', 'this_month'];
    const status = ['Done', 'Working on it', 'Stuck', 'Not Started'];
    const statusQuery = ['done', 'working_on_it', 'stuck', 'not_started'];

    const [tableSelected, setTableSelected] = useState();
    const [dateSelected, setDateSelected] = useState();
    const [statusSelected, setStatusSelected] = useState();

    const handleGroupFilter = async (index, table) => {
        if (tableSelected === undefined || tableSelected !== index) {
            setTableSelected(index);
            dispatch(filterGroup(table._id));
        } else {
            setTableSelected(undefined);
            dispatch(filterGroup(''));
        }
    };

    const handleDueDateFilter = async (index) => {
        if (dateSelected === undefined || dateSelected !== index) {
            setDateSelected(index);
            dispatch(filterDate(dueDateQuery[index]));
        } else {
            setDateSelected(undefined);
            dispatch(filterDate(''));
        }
    };

    const handleStatusFilter = async (index) => {
        if (statusSelected === undefined || statusSelected !== index) {
            setStatusSelected(index);
            dispatch(filterStatus(statusQuery[index]));
        } else {
            setStatusSelected(undefined);
            dispatch(filterStatus(''));
        }
    };
    return (
        <div className={cx('tool-filter')}>
            <div>
                <div className={cx('tool-filter-title')}>Group</div>
                <div>
                    {groups?.map((item, index) => (
                        <div
                            key={index}
                            className={cx('tool-filter-item', tableSelected === index && 'active')}
                            onClick={() => {
                                if (isLogin) {
                                    handleGroupFilter(index, item);
                                } else {
                                    dispatch(requireLogin(true));
                                }
                            }}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className={cx('tool-filter-title')}>Due Date</div>
                <div>
                    {dueDateItems?.map((item, index) => (
                        <div
                            key={index}
                            className={cx('tool-filter-item', dateSelected === index && 'active')}
                            onClick={() => {
                                if (isLogin) {
                                    handleDueDateFilter(index, item);
                                } else {
                                    dispatch(requireLogin(true));
                                }
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className={cx('tool-filter-title')}>Status</div>
                <div>
                    {status?.map((item, index) => (
                        <div
                            key={index}
                            className={cx('tool-filter-item', statusSelected === index && 'active')}
                            onClick={() => {
                                if (isLogin) {
                                    handleStatusFilter(index, item);
                                } else {
                                    dispatch(requireLogin(true));
                                }
                            }}
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
