import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import styles from './TaskTableBody.module.scss';
import TaskTableItem from './TaskTableItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    addTaskTableSelector,
    dueDateFilterSelector,
    searchTaskTableSelector,
    sortToolSelector,
    statusFilterSelector,
} from '~/redux/selectors';
import { requireLogin, resetTaskTable } from '~/redux/actions';
import moment from 'moment';

const cx = classNames.bind(styles);

function TaskTableBody({ index, indexTB, handleSearchTaskTable, lite, indexTableItem }) {
    dayjs.extend(weekOfYear);
    const isLogin = !!localStorage.getItem('accessToken');

    const taskItemNameMemory = `taskItems-${indexTB}-${index}`;
    // fix value 'undefined' to undefined for dayjs()
    const taskItemfixed = JSON.parse(localStorage.getItem(taskItemNameMemory))?.map((task) => ({
        ...task,
        valueDate: task.valueDate === 'undefined' ? undefined : task.valueDate,
    }));
    const [taskItems, setTaskItems] = useState(
        taskItemfixed || [{ valueTask: 'New Task', valueDate: undefined, status: 'Not Started' }],
    );
    const [newTaskItem, setNewTaskItem] = useState('');
    const [resultSearchTaskTable, setResultSearchTaskTable] = useState(taskItems);
    const [sortedResult, setSortedResult] = useState(taskItems);

    const dispatch = useDispatch();
    const anotherAddTask = useSelector(addTaskTableSelector);
    const searchTaskTable = useSelector(searchTaskTableSelector);
    const statusFilterValue = useSelector(statusFilterSelector);
    const dueDateFilterValue = useSelector(dueDateFilterSelector);
    const sortToolData = useSelector(sortToolSelector);

    const valueTask = taskItems.map((item) => item.valueTask);
    const valueDate = taskItems.map((item) => item.valueDate);
    const status = taskItems.map((item) => item.status);

    // Add task from button
    useEffect(() => {
        if (anotherAddTask.length > 0 && index === 0 && anotherAddTask[anotherAddTask.length - 1].index === indexTB) {
            setTaskItems((prev) => [
                ...prev,
                {
                    valueTask: anotherAddTask[anotherAddTask.length - 1].value,
                    valueDate: undefined,
                    status: 'Not Started',
                },
            ]);
        }
        return () => {
            // reset when this component unmouted
            anotherAddTask.length > 0 && dispatch(resetTaskTable());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anotherAddTask]);

    // // Search
    useEffect(() => {
        setResultSearchTaskTable(sortedResult);
        if (searchTaskTable.index === indexTB && sortToolData.indexTB === indexTB) {
            sortToolData.sortToolValue !== null ? handleSearch(sortedResult) : handleSearch(taskItems);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTaskTable, sortToolData, taskItems, sortedResult]);
    // Filter
    useEffect(() => {
        handleStatusFilter(statusFilterValue.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilterValue]);

    useEffect(() => {
        handleDueDateFilter(dueDateFilterValue.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dueDateFilterValue]);

    // // Sort tool
    useEffect(() => {
        if (sortToolData.indexTB === indexTB && sortToolData.index === 0 && !lite) {
            if (sortToolData.sortToolValue !== null) {
                sortToolData.label === 'Date' && handleDateSort([...valueDate]);
                sortToolData.label === 'Status' && handleStatusSort([...status]);
            } else {
                setSortedResult(taskItems);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortToolData, taskItems]);

    useEffect(() => {
        const taskItemsCoppy = taskItems.map((task) => ({
            ...task,
            valueDate: task.valueDate === undefined ? 'undefined' : task.valueDate,
        }));
        localStorage.setItem(taskItemNameMemory, JSON.stringify(taskItemsCoppy));
        if (
            localStorage.getItem(taskItemNameMemory) &&
            JSON.parse(localStorage.getItem(taskItemNameMemory)).length === 0
        ) {
            localStorage.removeItem(taskItemNameMemory);
        }
        setResultSearchTaskTable(taskItems);
    }, [taskItemNameMemory, taskItems]);

    // handle TaskItem
    const handleInputChange = (e) => {
        setNewTaskItem(e.target.value);
    };
    const handleAddTask = (e) => {
        if (isLogin) {
            if (newTaskItem !== '') {
                setTaskItems((prev) => [
                    ...prev,
                    { valueTask: newTaskItem, valueDate: undefined, status: 'Not Started' },
                ]);
            }
            setNewTaskItem('');
            e.target.focus();
        } else {
            dispatch(requireLogin(true));
        }
    };
    const handleClearTask = (index) => {
        if (taskItems.length === 1) {
            taskItems.splice(index, 1, { valueTask: 'New Task', valueDate: undefined, status: 'Not Started' });
        } else {
            taskItems.splice(index, 1);
        }
        setTaskItems([...taskItems]);
    };
    const handleEditTask = (index, value) => {
        taskItems[index].valueTask = value;
        setTaskItems([...taskItems]);
    };
    const handleSetStatus = (value, index) => {
        taskItems[index].status = value;
        setTaskItems([...taskItems]);
    };
    const handleSetDate = (value, index) => {
        taskItems[index].valueDate = `${value.$M + 1}-${value.$D}-${value.$y}`;
        setTaskItems([...taskItems]);
    };

    // handle Search
    const handleSearch = (dataSearch) => {
        if (searchTaskTable.value !== null) {
            const resultValue = dataSearch.filter((searchItem) => searchItem.valueTask.includes(searchTaskTable.value));
            setResultSearchTaskTable(resultValue);
            if (resultValue.length === 0) {
                handleSearchTaskTable(index);
            } else if (resultValue.length > 0) {
                handleSearchTaskTable(null);
            }
            if (searchTaskTable.value === '') {
                handleSearchTaskTable(undefined);
                setResultSearchTaskTable(dataSearch);
            }
        }
    };

    // handle filter
    const handleStatusFilter = (statusValue) => {
        if (statusValue !== null && statusFilterValue.indexTB === indexTB) {
            const resultFilterStatus = [];
            const dataFilter = dueDateFilterValue.value !== null ? resultSearchTaskTable : taskItems;
            dataFilter.map((item) => item.status === statusValue && resultFilterStatus.push(item));
            setResultSearchTaskTable(resultFilterStatus);
            resultFilterStatus.length === 0 ? handleSearchTaskTable(index) : handleSearchTaskTable(undefined);
        } else {
            dueDateFilterValue.value !== null
                ? handleDueDateFilter(dueDateFilterValue.value)
                : setResultSearchTaskTable(taskItems);
            !lite && handleSearchTaskTable(null);
        }
    };

    const handleDueDateFilter = (dueDateValue) => {
        const resultFilterDate = [];
        const dataFilter = statusFilterValue.value !== null ? resultSearchTaskTable : taskItems;
        if (dueDateValue === 'Overdue') {
            dataFilter.map((item) => {
                if (item.status !== 'Done' && dayjs(item.valueDate, ['MM/DD/YY']).isBefore(dayjs())) {
                    resultFilterDate.push(item);
                }
                return resultFilterDate;
            });
            setResultSearchTaskTable(resultFilterDate);
            resultFilterDate.length === 0 ? handleSearchTaskTable(index) : handleSearchTaskTable(undefined);
        }
        if (dueDateValue === 'Today' || dueDateValue === 'Tomorrow') {
            dataFilter.map((item) => {
                if (
                    item.valueDate ===
                    `${dayjs().$M + 1}-${dueDateValue === 'Today' ? dayjs().$D : dayjs().$D + 1}-${dayjs().$y}`
                ) {
                    resultFilterDate.push(item);
                }
                return resultFilterDate;
            });
            setResultSearchTaskTable(resultFilterDate);
            resultFilterDate.length === 0 ? handleSearchTaskTable(index) : handleSearchTaskTable(undefined);
        }
        if (dueDateValue === 'This Week' || dueDateValue === 'Next Week') {
            dataFilter.map((item) => {
                if (
                    dayjs(item.valueDate).week() ===
                    (dueDateValue === 'This Week' ? dayjs().week() : dayjs().week() + 1)
                ) {
                    resultFilterDate.push(item);
                }
                return resultFilterDate;
            });
            setResultSearchTaskTable(resultFilterDate);
            resultFilterDate.length === 0 ? handleSearchTaskTable(index) : handleSearchTaskTable(undefined);
        }
        if (dueDateValue === 'This Month') {
            dataFilter.map((item) => {
                if (dayjs(item.valueDate).$M === dayjs().$M) {
                    resultFilterDate.push(item);
                }
                return resultFilterDate;
            });
            setResultSearchTaskTable(resultFilterDate);
            resultFilterDate.length === 0 ? handleSearchTaskTable(index) : handleSearchTaskTable(undefined);
        }
        if (dueDateValue === null) {
            statusFilterValue.value !== null
                ? handleStatusFilter(statusFilterValue.value)
                : setResultSearchTaskTable(taskItems);
            !lite && handleSearchTaskTable(null);
        }
    };
    // handle sort
    const handleDateSort = (value) => {
        value.sort((a, b) => moment(a, ['MM/DD/YY']) - moment(b, ['MM/DD/YY']));

        const indexRepeat = [];
        const dataSort = value.map((item) => {
            const index = valueDate.indexOf(item);
            if (!indexRepeat.includes(index)) {
                indexRepeat.push(index);
                return taskItems[index];
            } else {
                const nextIndex = valueDate.indexOf(item, index + 1);
                indexRepeat.push(nextIndex);
                return taskItems[nextIndex];
            }
        });
        sortToolData.sortToolValue === true && setSortedResult(dataSort);
        sortToolData.sortToolValue === false && setSortedResult(dataSort.reverse());
    };

    const handleStatusSort = (value) => {
        value.sort((a, b) => {
            const order = ['Done', 'Working on it', 'Stuck', 'Not Started'];
            return order.indexOf(a) - order.indexOf(b);
        });
        const indexRepeat = [];
        const dataSort = value.map((item) => {
            const index = status.indexOf(item);
            if (!indexRepeat.includes(index)) {
                indexRepeat.push(index);
                return taskItems[index];
            } else {
                const nextIndex = status.indexOf(item, index + 1);
                indexRepeat.push(nextIndex);
                return taskItems[nextIndex];
            }
        });
        sortToolData.sortToolValue === true && setSortedResult(dataSort);
        sortToolData.sortToolValue === false && setSortedResult(dataSort.reverse());
    };

    return (
        <div>
            {indexTableItem >= 0 ? (
                <TaskTableItem
                    indexItem={indexTableItem}
                    key={indexTableItem}
                    color={`color${index}`}
                    content={valueTask[indexTableItem]}
                    status={status[indexTableItem]}
                    valueDate={dayjs(valueDate[indexTableItem])}
                    handleSetStatus={handleSetStatus}
                    handleEditTask={handleEditTask}
                    handleSetDate={handleSetDate}
                    indexTB={indexTB}
                    indexParent={index}
                    lite={lite}
                />
            ) : (
                <div>
                    {resultSearchTaskTable?.length > 0 &&
                        resultSearchTaskTable.map((item, indexItem) => (
                            <TaskTableItem
                                key={indexItem}
                                indexItem={indexItem}
                                color={`color${index}`}
                                content={item.valueTask}
                                status={item.status}
                                valueDate={dayjs(item.valueDate)}
                                handleClearTask={handleClearTask}
                                handleSetStatus={handleSetStatus}
                                handleEditTask={handleEditTask}
                                handleSetDate={handleSetDate}
                                indexTB={indexTB}
                                indexParent={index}
                                lite={lite}
                            />
                        ))}
                </div>
            )}
            {!lite && (
                <div className={cx('task-table-input', `color${index}`)}>
                    <input
                        value={newTaskItem}
                        onChange={handleInputChange}
                        placeholder=" + Add task"
                        onKeyDown={(e) => (e.key === 'Enter' ? handleAddTask(e) : undefined)}
                    />
                </div>
            )}
        </div>
    );
}

export default TaskTableBody;
