/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';

import styles from './MyWorkPage.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search/Search';
import MyWorkItem from './MyWorkItem';
import TaskTableBody from '../TaskBoard/BodyTaskBoard/TaskTableBody';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import axiosInstance from '~/axiosConfig';
import { PuffLoader } from 'react-spinners';

const cx = classNames.bind(styles);

const MyWorkItemMemo = React.memo(MyWorkItem);
const TaskTableBodyMemo = React.memo(TaskTableBody);

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                [action.payload.key]: action.payload.data,
            };
        case 'SET_DATA_MY_WORK':
            return { ...state, dataMyWork: action.payload };
        default:
            return state;
    }
};

function MyWorkPage() {
    const [searchValue, setSearchValue] = useState('');
    const [state, dispatch] = useReducer(taskReducer, {
        past_date: [],
        today: [],
        this_week: [],
        next_week: [],
        dataMyWork: {
            past_date: [],
            today: [],
            this_week: [],
            next_week: [],
        },
    });
    const [loading, setLoading] = useState(false);

    const getMyTaskBoard = useCallback(async () => {
        const response = await axiosInstance.get('/user/my_workspaces');
        return response.data;
    }, []);

    const getData = useCallback(
        async (dueDate) => {
            const myTaskBoards = await getMyTaskBoard();
            const data = await Promise.all(
                myTaskBoards.map(async (item) => {
                    const response = await axiosInstance.get(
                        `/workspace/${item._id}/tables?&&dueDate=${dueDate}&&query=${searchValue ?? ''}`,
                    );
                    return response.data.map((table) => ({
                        ...table,
                        workspace: item.name,
                    }));
                }),
            );

            const tables = data.flat();
            dispatch({
                type: 'SET_TASKS',
                payload: {
                    key: dueDate,
                    data: tables.map((item) => item.tasks).flat(),
                },
            });

            return tables;
        },
        [getMyTaskBoard, searchValue],
    );

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const keys = ['past_date', 'today', 'this_week', 'next_week'];
            const allData = await Promise.all(keys.map((key) => getData(key)));

            const formattedData = keys.reduce((acc, key, idx) => {
                acc[key] = allData[idx];
                return acc;
            }, {});

            dispatch({ type: 'SET_DATA_MY_WORK', payload: formattedData });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [getData]);

    useEffect(() => {
        fetchData();
    }, [searchValue]);

    const handleSetInputValue = useCallback(async (value) => {
        setSearchValue(value);
    }, []);

    const renderTaskItems = useCallback(
        (title, taskKey) => {
            return (
                <MyWorkItemMemo
                    icon={images.arrowRightIcon}
                    title={title}
                    items={state[taskKey].length}
                    key={taskKey}
                    taskKey={taskKey}
                >
                    {state.dataMyWork[taskKey].map((data, i) => (
                        <div key={data._id} className={cx('my-work-items', i === 0 && 'first')}>
                            <TaskTableBodyMemo
                                tasks={data.tasks}
                                key={data._id}
                                index={data._id}
                                tableTitle={data.name}
                                taskBoardsTitle={data.workspace}
                                main={i === 0}
                                lite
                            />
                        </div>
                    ))}
                </MyWorkItemMemo>
            );
        },
        [state],
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
