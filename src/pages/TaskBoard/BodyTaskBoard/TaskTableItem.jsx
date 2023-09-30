import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import styles from './TaskTableItem.module.scss';
import MyDatePicker from '~/components/DatePicker/MyDatePicker';
import { useSelector } from 'react-redux';
import { hideToolSelector, taskBoardsSelector } from '~/redux/selectors';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

const cx = classNames.bind(styles);

function TaskTableItem({
    content,
    color,
    indexItem,
    indexTB,
    indexParent,
    status,
    valueDate,
    handleClearTask,
    handleEditTask,
    handleSetStatus,
    handleSetDate,
    lite,
}) {
    dayjs.extend(weekOfYear);

    const dataTableItemToday = JSON.parse(localStorage.getItem('dataTaskTableToday'));
    const dataTableItemThisWeek = JSON.parse(localStorage.getItem('dataTaskTableThisWeek'));

    const hideTool = useSelector(hideToolSelector);
    const taskBoards = useSelector(taskBoardsSelector);

    const main =
        dataTableItemToday?.[0]?.indexTB === indexTB &&
        dataTableItemToday?.[0]?.indexParent === indexParent &&
        dataTableItemToday?.[0]?.index === indexItem &&
        lite;
    const isToday =
        `${valueDate.$M + 1}-${valueDate.$D}-${valueDate.$y}` === `${dayjs().$M + 1}-${dayjs().$D}-${dayjs().$y}`;
    const statesArr = [
        ['green', 'yellow', 'red', 'grey'],
        ['Done', 'Working on it', 'Stuck', 'Not Started'],
    ];

    const [valueContent, setValueContent] = useState(content);
    const [dataToday, setDataToday] = useState(dataTableItemToday || []);
    const [dataThisWeek, setDataThisWeek] = useState(dataTableItemThisWeek || []);

    useEffect(() => {
        setValueContent(content);
    }, [content]);

    // Process data for MyWorkPage
    // dataToday
    useEffect(() => {
        if (isToday) {
            const isDuplicate = dataToday.some(
                (item) => item.indexTB === indexTB && item.indexParent === indexParent && item.index === indexItem,
            );
            if (!isDuplicate) {
                setDataToday([
                    ...dataToday,
                    {
                        indexTB: indexTB,
                        indexParent: indexParent,
                        index: indexItem,
                        value: `${valueDate.$M + 1}-${valueDate.$D}-${valueDate.$y}`,
                    },
                ]);
            }
        } else {
            const indexDuplicate = dataTableItemToday?.findIndex(
                (item) => item.indexTB === indexTB && item.indexParent === indexParent && item.index === indexItem,
            );
            if (indexDuplicate >= 0) {
                dataToday.splice(indexDuplicate, 1);
                localStorage.setItem('dataTaskTableToday', JSON.stringify([...dataToday]));
            }
        }
        localStorage.setItem('dataTaskTableToday', JSON.stringify(dataToday));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataToday]);

    const handleCheckValueToday = (value) => {
        if (`${value.$M + 1}-${value.$D}-${value.$y}` !== `${dayjs().$M + 1}-${dayjs().$D}-${dayjs().$y}`) {
            const indexDuplicate = dataTableItemToday?.findIndex(
                (item) => item.indexTB === indexTB && item.indexParent === indexParent && item.index === indexItem,
            );
            if (indexDuplicate >= 0) {
                dataToday.splice(indexDuplicate, 1);
                localStorage.setItem('dataTaskTableToday', JSON.stringify([...dataToday]));
            }
        } else {
            setDataToday((prev) => [
                ...prev,
                {
                    indexTB: indexTB,
                    indexParent: indexParent,
                    index: indexItem,
                    value: `${value.$M + 1}-${value.$D}-${value.$y}`,
                },
            ]);
            localStorage.setItem('dataTaskTableToday', JSON.stringify(dataToday));
        }
    };
    // dataThisWeek
    useEffect(() => {
        if (valueDate.week() === dayjs().week() && !isToday) {
            const isDuplicate = dataThisWeek.some(
                (item) => item.indexTB === indexTB && item.indexParent === indexParent && item.index === indexItem,
            );
            if (!isDuplicate) {
                setDataThisWeek([
                    ...dataThisWeek,
                    {
                        indexTB: indexTB,
                        indexParent: indexParent,
                        index: indexItem,
                        value: `${valueDate.$M + 1}-${valueDate.$D}-${valueDate.$y}`,
                    },
                ]);
            }
        } else {
            const indexDuplicate = dataTableItemThisWeek?.findIndex(
                (item) => item.indexTB === indexTB && item.indexParent === indexParent && item.index === indexItem,
            );
            console.log(indexDuplicate);
            if (indexDuplicate >= 0) {
                dataThisWeek.splice(indexDuplicate, 1);
                console.log([...dataThisWeek]);
                localStorage.setItem('dataTaskTableThisWeek', JSON.stringify([...dataThisWeek]));
            }
        }
        localStorage.setItem('dataTaskTableThisWeek', JSON.stringify(dataThisWeek));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataThisWeek]);
    // end

    const handleSetValueContent = (e) => {
        setValueContent(e.target.value);
    };

    const renderStatus = () => (
        <ul className={cx('states')}>
            {statesArr[0].map((item, index) => (
                <li key={index} onClick={() => handleSetStatus(item, indexItem)} className={cx(item)}>
                    {statesArr[1][index]}
                </li>
            ))}
        </ul>
    );
    return (
        <div className={cx('task-table-item')}>
            <div className={cx('task-table-container', lite ? 'lite' : color)}>
                <span className={cx('task-table-name')}>
                    <input
                        className={cx('table-name-input')}
                        value={valueContent}
                        onChange={handleSetValueContent}
                        onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
                        onBlur={(e) => handleEditTask(indexItem, e.target.value)}
                    />
                </span>
                {/* lite la phien ban hien thi ben mywork */}
                {lite && <div className={cx('task-table-parent', main && 'Board')}>{taskBoards[indexTB].name}</div>}
                {lite && (
                    <div className={cx('task-table-parent', main && 'Table')}>
                        {JSON.parse(localStorage.getItem(`tables${indexTB}`))[indexParent]}
                    </div>
                )}
                <div className={cx('task-table-info')}>
                    {(indexTB === hideTool.index && hideTool.hideToolValue[0] === true) ||
                    indexTB !== hideTool.index ? (
                        <div className={cx('table-info-item', 'date', main && 'Date')}>
                            <MyDatePicker
                                value={valueDate}
                                onChange={(newValue) => {
                                    handleSetDate(newValue, indexItem);
                                    handleCheckValueToday(newValue);
                                }}
                            />
                        </div>
                    ) : null}
                    {(indexTB === hideTool.index && hideTool.hideToolValue[1] === true) ||
                    indexTB !== hideTool.index ? (
                        <div className={cx('table-info-item', main && 'Person')}>
                            <img
                                src="https://files.monday.com/use1/photos/43954248/thumb_small/43954248-user_photo_initials_2023_05_31_15_01_39.png?1685545299"
                                alt=""
                            />
                        </div>
                    ) : null}
                    {(indexTB === hideTool.index && hideTool.hideToolValue[2] === true) ||
                    indexTB !== hideTool.index ? (
                        <Tippy interactive render={renderStatus} placement="top" trigger="click">
                            <div className={cx('table-info-item', main && 'Status', status)}>
                                {statesArr[1].filter((_, index) => statesArr[0][index] === status)}
                            </div>
                        </Tippy>
                    ) : null}
                    {!hideTool.hideToolValue.includes(true) && <div className={cx('table-info-item')}></div>}
                </div>
            </div>
            {!lite && (
                <FontAwesomeIcon
                    onClick={() => handleClearTask(indexItem)}
                    className={cx('table-item-close')}
                    icon={faClose}
                />
            )}
        </div>
    );
}

export default TaskTableItem;
