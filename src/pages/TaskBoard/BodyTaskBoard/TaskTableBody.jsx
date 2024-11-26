import { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import styles from './TaskTableBody.module.scss';
import TaskTableItem from './TaskTableItem';
import { useDispatch } from 'react-redux';
import { requireLogin } from '~/redux/actions';
import { TableValue } from '..';
import axiosInstance from '~/axiosConfig';

const cx = classNames.bind(styles);

function TaskTableBody({ index, lite, tasks, tableTitle, main, taskBoardsTitle }) {
    dayjs.extend(weekOfYear);
    const isLogin = !!localStorage.getItem('accessToken');

    const tableValue = useContext(TableValue);
    const table = tableValue?.[0];
    const handleUpdate = tableValue?.[1];

    const [newTaskItem, setNewTaskItem] = useState('');
    const dispatch = useDispatch();

    // handle TaskItem
    const handleInputChange = (e) => {
        setNewTaskItem(e.target.value);
    };
    const handleAddTask = async (e) => {
        if (isLogin) {
            await axiosInstance.post(`/task`, { name: e.target.value, table: table._id });
            await handleUpdate();
            setNewTaskItem('');
            e.target.focus();
        } else {
            dispatch(requireLogin(true));
        }
    };

    return (
        <div>
            {lite ? (
                <div>
                    {tasks?.length > 0 &&
                        tasks.map((item, indexItem) => (
                            <TaskTableItem
                                task={item}
                                key={indexItem}
                                index={item._id}
                                color={`color0`}
                                lite={lite}
                                main={main && indexItem === 0}
                                tableTitle={tableTitle}
                                taskBoardsTitle={taskBoardsTitle}
                            />
                        ))}
                </div>
            ) : (
                <div>
                    {tasks?.length > 0 &&
                        tasks.map((item, indexItem) => <TaskTableItem task={item} key={indexItem} index={item._id} />)}
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
