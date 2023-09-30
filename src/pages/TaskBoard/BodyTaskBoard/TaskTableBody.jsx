import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';

import styles from './TaskTableBody.module.scss';
import TaskTableItem from './TaskTableItem';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskTableSelector, searchTaskTableSelector, sortToolSelector } from '~/redux/selectors';
import { resetTaskTable } from '~/redux/actions';
import moment from 'moment';

const cx = classNames.bind(styles);

function TaskTableBody({ index, indexTB, handleSearchTaskTable, lite, indexTableItem }) {
    const taskItemNameMemory = `taskItems-${indexTB}-${index}`;
    const statusNameMemory = `status-${indexTB}-${index}`;
    const dateNameMemory = `date-${indexTB}-${index}`;

    const [taskItems, setTaskItems] = useState(JSON.parse(localStorage.getItem(taskItemNameMemory)) || ['New Task']);
    const [newTaskItem, setNewTaskItem] = useState('');
    const [status, setStatus] = useState(JSON.parse(localStorage.getItem(statusNameMemory)) || ['grey']);
    const [valueDate, setValueDate] = useState(JSON.parse(localStorage.getItem(dateNameMemory)) || []);
    const [resultSearchTaskTable, setResultSearchTaskTable] = useState(taskItems);
    const [sortedResult, setSortedResult] = useState([]);

    const dispatch = useDispatch();
    const anotherAddTask = useSelector(addTaskTableSelector);
    const searchTaskTable = useSelector(searchTaskTableSelector);
    const sortToolData = useSelector(sortToolSelector);

    const indexRepeat = [];
    const indexSort = sortedResult.map((item) => {
        if (sortToolData.label === 'Date') {
            const index = valueDate.indexOf(item);
            if (!indexRepeat.includes(index)) {
                indexRepeat.push(index);
                return index;
            } else {
                const nextIndex = valueDate.indexOf(item, index + 1);
                indexRepeat.push(nextIndex);
                return nextIndex;
            }
        } else if (sortToolData.label === 'Status') {
            const index = status.indexOf(item);
            if (!indexRepeat.includes(index)) {
                indexRepeat.push(index);
                return index;
            } else {
                const nextIndex = status.indexOf(item, index + 1);
                indexRepeat.push(nextIndex);
                return nextIndex;
            }
        }
        return sortedResult;
    });
    // console.log(sortedResult);
    const reverseIndexSort = [...indexSort].reverse();

    const indexSearch = resultSearchTaskTable.map((item) => taskItems.indexOf(item));

    useEffect(() => {
        if (sortToolData.indexTB === indexTB && sortToolData.index === 0 && !lite) {
            if (sortToolData.label === 'Date') {
                const newValueDate = [...valueDate];
                setSortedResult(newValueDate.sort((a, b) => moment(a, ['MM/DD/YY']) - moment(b, ['MM/DD/YY'])));
            } else if (sortToolData.label === 'Status') {
                const newValueStatus = [...status];
                newValueStatus.sort((a, b) => {
                    const order = ['yellow', 'red', 'green', 'grey'];
                    return order.indexOf(a) - order.indexOf(b);
                });
                setSortedResult(newValueStatus);
            }
        } else {
            setSortedResult([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortToolData, status, valueDate]);

    useEffect(() => {
        if (searchTaskTable.index === indexTB) {
            if (sortToolData.sortToolValue === true) {
                const taskItemsAfterSort = indexSort.map((index) => [...taskItems][index]);
                handleSearch(taskItemsAfterSort);
            } else if (sortToolData.sortToolValue === false) {
                const taskItemsAfterSort = reverseIndexSort.map((index) => [...taskItems][index]);
                handleSearch(taskItemsAfterSort);
            } else {
                handleSearch(taskItems);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTaskTable, taskItems, sortToolData]);

    useEffect(() => {
        if (anotherAddTask.length > 0 && index === 0 && anotherAddTask[anotherAddTask.length - 1].index === indexTB) {
            setTaskItems((prev) => [...prev, anotherAddTask[anotherAddTask.length - 1].value]);
            setStatus((prev) => [...prev, 'grey']);
            setValueDate((prev) => [...prev, undefined]);
        }

        return () => {
            // reset when this component unmouted
            if (anotherAddTask.length > 0) {
                dispatch(resetTaskTable());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anotherAddTask]);

    useEffect(() => {
        localStorage.setItem(taskItemNameMemory, JSON.stringify(taskItems));
        if (
            localStorage.getItem(taskItemNameMemory) &&
            JSON.parse(localStorage.getItem(taskItemNameMemory)).length === 0
        ) {
            localStorage.removeItem(taskItemNameMemory);
        }
        localStorage.setItem(statusNameMemory, JSON.stringify(status));
        if (localStorage.getItem(statusNameMemory) && JSON.parse(localStorage.getItem(statusNameMemory)).length === 0) {
            localStorage.removeItem(statusNameMemory);
        }
        localStorage.setItem(dateNameMemory, JSON.stringify(valueDate));
        if (localStorage.getItem(dateNameMemory) && JSON.parse(localStorage.getItem(dateNameMemory)).length === 0) {
            localStorage.removeItem(dateNameMemory);
        }
        setResultSearchTaskTable(taskItems);
    }, [status, taskItems, valueDate, statusNameMemory, taskItemNameMemory, dateNameMemory]);

    const handleInputChange = (e) => {
        setNewTaskItem(e.target.value);
    };
    const handleAddTask = (e) => {
        if (newTaskItem !== '') {
            setTaskItems((prev) => [...prev, newTaskItem]);
            setStatus((prev) => [...prev, 'grey']);
            setValueDate((prev) => [...prev, undefined]);
        }
        setNewTaskItem('');
        e.target.focus();
    };
    const handleClearTask = (index) => {
        taskItems.splice(index, 1);
        setTaskItems([...taskItems]);
        status.splice(index, 1);
        setStatus([...status]);
        valueDate.splice(index, 1);
        setValueDate([...valueDate]);
    };
    const handleEditTask = (index, value) => {
        taskItems.splice(index, 1, value);
        setTaskItems([...taskItems]);
    };
    const handleSetStatus = (value, index) => {
        status.splice(index, 1, value);
        setStatus([...status]);
    };
    const handleSetDate = (value, index) => {
        valueDate.splice(index, 1, `${value.$M + 1}-${value.$D}-${value.$y}`);
        setValueDate([...valueDate]);
    };

    const handleSearch = (dataSearch) => {
        if (searchTaskTable.value !== null) {
            const resultValue = dataSearch.filter((searchItem) => searchItem.includes(`${searchTaskTable.value}`));

            setResultSearchTaskTable(resultValue);
            if (resultValue.length === 0) {
                handleSearchTaskTable(index);
            } else if (resultValue.length > 0) {
                handleSearchTaskTable(null);
            }
            if (searchTaskTable.value === '') {
                handleSearchTaskTable(undefined);
            }
        }
    };

    const handleSetIndex = (index) => {
        const isSortToolValueFalse = sortToolData.sortToolValue === false && sortToolData.indexTB === indexTB;
        const isSortToolValueTrue = sortToolData.sortToolValue === true && sortToolData.indexTB === indexTB;
        const isSearchTaskTableValue = searchTaskTable.value !== null && searchTaskTable.value !== '';

        if (isSortToolValueFalse) {
            return isSearchTaskTableValue ? indexSearch[index] : reverseIndexSort[index];
        } else if (isSortToolValueTrue) {
            return isSearchTaskTableValue ? indexSearch[index] : indexSort[index];
        }

        return isSearchTaskTableValue ? indexSearch[index] : index;
    };

    return (
        <div>
            {indexTableItem >= 0 ? (
                <TaskTableItem
                    indexItem={indexTableItem}
                    key={indexTableItem}
                    color={`color${index}`}
                    content={taskItems[indexTableItem]}
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
                    {resultSearchTaskTable &&
                        resultSearchTaskTable.length > 0 &&
                        resultSearchTaskTable.map((_, indexItem) => (
                            <TaskTableItem
                                indexItem={handleSetIndex(indexItem)}
                                key={indexItem}
                                color={`color${index}`}
                                content={taskItems[handleSetIndex(indexItem)]}
                                status={status[handleSetIndex(indexItem)]}
                                valueDate={dayjs(valueDate[handleSetIndex(indexItem)])}
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
