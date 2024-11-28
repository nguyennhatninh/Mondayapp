import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import styles from './TaskTableItem.module.scss';
import MyDatePicker from '~/components/DatePicker/MyDatePicker';
import dayjs from 'dayjs';
import { TaskBoardValue } from '~/App';
import axiosInstance from '~/axiosConfig';
import { TableValue } from '..';

const cx = classNames.bind(styles);

function TaskTableItem({ index, lite, task, tableTitle, main, taskBoardsTitle }) {
    const taskBoardValue = useContext(TaskBoardValue);
    const tableValue = useContext(TableValue);
    const taskBoard = taskBoardValue?.[0];
    const handleUpdate = tableValue?.[1];

    const valueDate = dayjs(task.date);

    const statesArr = [
        { done: 'Done' },
        { working_on_it: 'Working on it' },
        { stuck: 'Stuck' },
        { not_started: 'Not Started' },
    ];

    const [valueContent, setValueContent] = useState(task.name);
    const [visibleState, setVisibleState] = useState(false);

    useEffect(() => {
        setValueContent(task.name);
    }, [task.name]);

    const handleSetValueContent = (e) => {
        setValueContent(e.target.value);
    };

    const renderStatus = () => (
        <ul className={cx('states')}>
            {statesArr.map((item, id) => (
                <li
                    key={id}
                    onClick={async () => {
                        await handleEditTask(index, { status: Object.keys(item)[0] });
                        setVisibleState(false);
                    }}
                    className={cx(`color_${Object.keys(item)}`)}
                >
                    {Object.values(item)}
                </li>
            ))}
        </ul>
    );

    const handleEditTask = async (index, data) => {
        await axiosInstance.patch(`/task/${index}`, data);
        await handleUpdate();
    };

    const handleDeleteTask = async (index) => {
        await axiosInstance.delete(`/task/${index}`);
        await handleUpdate();
    };
    return (
        <div className={cx('task-table-item')}>
            <div className={cx('task-table-container', lite && 'lite')}>
                <span className={cx('task-table-name')}>
                    <input
                        className={cx('table-name-input')}
                        value={valueContent}
                        onChange={handleSetValueContent}
                        onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                        onBlur={(e) => handleEditTask(index, { name: e.target.value })}
                    />
                </span>
                {/* lite la phien ban hien thi ben mywork */}
                {lite && <div className={cx('task-table-parent', main && 'Board')}>{taskBoardsTitle}</div>}
                {lite && <div className={cx('task-table-parent', main && 'Table')}>{tableTitle}</div>}
                <div className={cx('task-table-info')}>
                    {taskBoard?.date | lite ? (
                        <div className={cx('table-info-item', 'date', main && 'Date')}>
                            <MyDatePicker
                                value={valueDate}
                                onChange={(newValue) => {
                                    const valueDate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
                                    handleEditTask(index, { date: valueDate });
                                }}
                            />
                        </div>
                    ) : null}
                    {taskBoard?.person | lite ? (
                        <div className={cx('table-info-item', main && 'Person')}>
                            <img
                                src="https://files.monday.com/use1/photos/43954248/thumb_small/43954248-user_photo_initials_2023_05_31_15_01_39.png?1685545299"
                                alt=""
                            />
                        </div>
                    ) : null}
                    {taskBoard?.status | lite ? (
                        <Tippy
                            interactive
                            render={renderStatus}
                            placement="top"
                            visible={visibleState}
                            onClickOutside={() => setVisibleState(false)}
                        >
                            <div
                                onClick={() => setVisibleState(true)}
                                className={cx('table-info-item', main && 'Status', `color_${task.status}`)}
                            >
                                {statesArr.find((state) => state[task?.status])?.[task?.status]}
                            </div>
                        </Tippy>
                    ) : null}
                    {!taskBoard?.status && !taskBoard?.person && !taskBoard?.date && !lite && (
                        <div className={cx('table-info-item')}></div>
                    )}
                </div>
            </div>
            {!lite && (
                <FontAwesomeIcon
                    onClick={async () => await handleDeleteTask(index)}
                    className={cx('table-item-close')}
                    icon={faClose}
                />
            )}
        </div>
    );
}

export default TaskTableItem;
