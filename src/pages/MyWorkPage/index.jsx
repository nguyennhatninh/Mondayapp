/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';

import styles from './MyWorkPage.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search/Search';
import MyWorkItem from './MyWorkItem';
import TaskTableBody from '../TaskBoard/BodyTaskBoard/TaskTableBody';
import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from '~/axiosConfig';
import { PuffLoader } from 'react-spinners';

const cx = classNames.bind(styles);

const MyWorkItemMemo = React.memo(MyWorkItem);
const TaskTableBodyMemo = React.memo(TaskTableBody);

function MyWorkPage() {
    const [searchValue, setSearchValue] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getMyTaskBoard = useCallback(async () => {
        const response = await axiosInstance.get('/user/my_workspaces');
        return response.data;
    }, []);

    const fetchAllTasks = useCallback(async () => {
        setLoading(true);
        try {
            const keys = ['past_date', 'today', 'this_week', 'next_week'];
            const myTaskBoards = await getMyTaskBoard();

            const allData = await Promise.all(
                keys.map(async (key) => {
                    const data = await Promise.all(
                        myTaskBoards.map(async (item) => {
                            const response = await axiosInstance.get(`/workspace/${item._id}/tables?&&dueDate=${key}`);
                            return response.data.map((table) => ({
                                ...table,
                                workspace: item.name,
                            }));
                        }),
                    );
                    return data.flat();
                }),
            );

            const flattenedTasks = allData.flatMap((tables) =>
                tables.flatMap((table) =>
                    table.tasks.map((task) => ({
                        ...task,
                        workspace: table.workspace,
                        tableTitle: table.name,
                        dueDate: keys.find((key) => key),
                    })),
                ),
            );

            setAllTasks(flattenedTasks);
            setFilteredTasks(flattenedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    }, [getMyTaskBoard]);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        const lowercasedValue = searchValue.toLowerCase();

        const filtered = allTasks.filter((task) => task.name.toLowerCase().includes(lowercasedValue));

        setFilteredTasks(filtered);
    }, [searchValue]);

    const handleSetInputValue = (value) => {
        setSearchValue(value);
    };

    const renderTaskItems = useCallback(
        (title, taskKey) => {
            const tasksForKey = filteredTasks.filter((task) => task.dueDate === taskKey);

            return (
                <MyWorkItemMemo
                    icon={images.arrowRightIcon}
                    title={title}
                    items={tasksForKey.length}
                    key={taskKey}
                    taskKey={taskKey}
                >
                    {tasksForKey.map((task, i) => (
                        <div key={task._id} className={cx('my-work-items', i === 0 && 'first')}>
                            <TaskTableBodyMemo
                                tasks={[task]}
                                key={task._id}
                                index={task._id}
                                tableTitle={task.tableTitle}
                                taskBoardsTitle={task.workspace}
                                main={i === 0}
                                lite
                            />
                        </div>
                    ))}
                </MyWorkItemMemo>
            );
        },
        [filteredTasks],
    );

    return (
        <div className={cx('my-work')}>
            {loading && (
                <div className={cx('overlay', { loading })}>
                    <PuffLoader color="#fafafa" size={80} />
                </div>
            )}
            <div className={cx('my-work-title')}>
                My work
                <div></div>
            </div>
            <div className={cx('my-work-body')}>
                <div className={cx('my-work-tool')}>
                    <Search
                        key={2}
                        placeholder={'Search'}
                        iconRight={images.searchIcon}
                        hover
                        handleSetInputValue={handleSetInputValue}
                    />
                    <input type="checkbox" />
                    <div>Hide done items</div>
                </div>
                <div>
                    {['Past Date', 'Today', 'This Week', 'Next Week'].map((title) => {
                        const taskKey = title.toLowerCase().replace(/ /g, '_');
                        return renderTaskItems(title, taskKey);
                    })}
                </div>
            </div>
        </div>
    );
}

export default MyWorkPage;
