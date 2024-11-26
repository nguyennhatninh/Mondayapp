/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';

import styles from './MyWorkPage.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search/Search';
import MyWorkItem from './MyWorkItem';
import TaskTableBody from '../TaskBoard/BodyTaskBoard/TaskTableBody';
import { useEffect, useState } from 'react';
import axiosInstance from '~/axiosConfig';

const cx = classNames.bind(styles);

function MyWorkPage() {
    const [dataPastDate, setDataPastDate] = useState();
    const [taskPastDate, setTaskPastDate] = useState([]);
    const [dataToday, setDataToday] = useState();
    const [taskToday, setTaskToday] = useState([]);
    const [dataThisWeek, setDataThisWeek] = useState();
    const [taskThisWeek, setTaskThisWeek] = useState([]);
    const [dataNextWeek, setDataNextWeek] = useState();
    const [taskNextWeek, setTaskNextWeek] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                await getDataPastDate();
                await getDataToday();
                await getDataThisWeek();
                await getDataNextWeek();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const getMyTaskBoard = async () => {
        const taskBoards = await axiosInstance.get('/user/my_workspaces');
        return taskBoards.data;
    };

    const getDataPastDate = async () => {
        const myTaskBoards = await getMyTaskBoard();

        const data = await Promise.all(
            myTaskBoards?.map(async (item) => {
                const tables = await axiosInstance.get(`/workspace/${item._id}/tables?&&dueDate=past_date`);
                tables.data.map((table) => (table.workspace = item.name));
                return [...tables.data];
            }),
        );

        const tables = data.map((item) => item).flat();

        setDataPastDate(tables);
        setTaskPastDate(tables.map((item) => item.tasks).flat());
        return tables;
    };

    const getDataToday = async () => {
        const myTaskBoards = await getMyTaskBoard();
        const data = await Promise.all(
            myTaskBoards?.map(async (item) => {
                const tables = await axiosInstance.get(`/workspace/${item._id}/tables?&&dueDate=today`);
                tables.data.map((table) => (table.workspace = item.name));
                return [...tables.data];
            }),
        );
        const tables = data.map((item) => item).flat();

        setDataToday(tables);
        setTaskToday(tables.map((item) => item.tasks).flat());
        return tables;
    };

    const getDataThisWeek = async () => {
        const myTaskBoards = await getMyTaskBoard();
        const data = await Promise.all(
            myTaskBoards?.map(async (item) => {
                const tables = await axiosInstance.get(`/workspace/${item._id}/tables?&&dueDate=this_week`);
                tables.data.map((table) => (table.workspace = item.name));
                return [...tables.data];
            }),
        );
        const tables = data.map((item) => item).flat();

        setDataThisWeek(tables);
        setTaskThisWeek(tables.map((item) => item.tasks).flat());
        return tables;
    };

    const getDataNextWeek = async () => {
        const myTaskBoards = await getMyTaskBoard();
        const data = await Promise.all(
            myTaskBoards?.map(async (item) => {
                const tables = await axiosInstance.get(`/workspace/${item._id}/tables?&&dueDate=next_week`);
                tables.data.map((table) => (table.workspace = item.name));
                return [...tables.data];
            }),
        );
        const tables = data.map((item) => item).flat();

        setDataNextWeek(tables);
        setTaskNextWeek(tables.map((item) => item.tasks).flat());
        return tables;
    };

    return (
        <div className={cx('my-work')}>
            <div className={cx('my-work-title')}>
                My work
                <div></div>
            </div>
            <div className={cx('my-work-body')}>
                <div className={cx('my-work-tool')}>
                    <Search key={2} placeholder={'Search'} iconRight={images.searchIcon} hover />
                    <input type="checkbox" />
                    <div>Hide done items</div>
                </div>
                <div>
                    <MyWorkItem
                        icon={images.arrowRightIcon}
                        title={'Past Dates'}
                        items={taskPastDate?.length > 0 ? taskPastDate?.length : 0}
                    >
                        {dataPastDate?.length > 0 &&
                            dataPastDate?.map((data, index) => (
                                <div key={index} className={cx('my-work-items', index === 0 && 'first')}>
                                    <div></div>
                                    <TaskTableBody
                                        tasks={data.tasks}
                                        key={data._id}
                                        index={data._id}
                                        tableTitle={data.name}
                                        taskBoardsTitle={data.workspace}
                                        main={index === 0 && true}
                                        lite
                                    />
                                </div>
                            ))}
                    </MyWorkItem>
                    <MyWorkItem
                        icon={images.arrowRightIcon}
                        title={'Today'}
                        items={dataToday?.length > 0 ? taskToday?.length : 0}
                    >
                        {dataToday?.length > 0 &&
                            dataToday?.map((data, index) => (
                                <div key={index} className={cx('my-work-items', index === 0 && 'first')}>
                                    <div></div>
                                    <TaskTableBody
                                        tasks={data.tasks}
                                        key={data._id}
                                        index={data._id}
                                        tableTitle={data.name}
                                        main={index === 0 && true}
                                        lite
                                    />
                                </div>
                            ))}
                    </MyWorkItem>
                    <MyWorkItem
                        icon={images.arrowRightIcon}
                        title={'This Week'}
                        items={taskThisWeek?.length > 0 ? taskThisWeek.length : 0}
                    >
                        {dataThisWeek?.length > 0 &&
                            dataThisWeek?.map((data, index) => (
                                <div key={index} className={cx('my-work-items', index === 0 && 'first')}>
                                    <div></div>
                                    <TaskTableBody
                                        tasks={data.tasks}
                                        key={data._id}
                                        index={data._id}
                                        tableTitle={data.name}
                                        main={index === 0 && true}
                                        lite
                                    />
                                </div>
                            ))}
                    </MyWorkItem>
                    <MyWorkItem
                        icon={images.arrowRightIcon}
                        title={'Next week'}
                        items={taskNextWeek?.length > 0 ? taskNextWeek.length : 0}
                    >
                        {dataNextWeek?.length > 0 &&
                            dataNextWeek?.map((data, index) => (
                                <div key={index} className={cx('my-work-items', index === 0 && 'first')}>
                                    <div></div>
                                    <TaskTableBody
                                        tasks={data.tasks}
                                        key={data._id}
                                        index={data._id}
                                        tableTitle={data.name}
                                        main={index === 0 && true}
                                        lite
                                    />
                                </div>
                            ))}
                    </MyWorkItem>
                </div>
            </div>
        </div>
    );
}

export default MyWorkPage;
