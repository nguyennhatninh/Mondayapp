/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './TaskBoard.modules.scss';
import HeaderTaskBoard from './HeaderTaskBoard/HeaderTaskBoard';
import TaskTableHeader from './BodyTaskBoard/TaskTableHeader';
import TaskTableBody from './BodyTaskBoard/TaskTableBody';
import { createContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import TaskBoardEmpty from '~/layouts/components/Sidebar/TaskBoardList/TaskBoardEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { clearTool, requireLogin } from '~/redux/actions';
import axiosInstance from '~/axiosConfig';
import { toolsSelector } from '~/redux/selectors';
import { PuffLoader } from 'react-spinners';

const cx = classNames.bind(styles);

export const TableValue = createContext();
export const TablesInWorkspace = createContext();

function TaskBoard({ taskBoard }) {
    const isLogin = !!localStorage.getItem('accessToken');
    const indexTB = taskBoard._id;

    const tools = useSelector(toolsSelector);

    const [lite, setLite] = useState(false);
    const [tables, setTables] = useState([
        {
            name: 'Table Title 1',
            tasks: [
                {
                    name: 'New Task',
                    date: new Date(),
                    status: 'not_started',
                },
            ],
        },
        {
            name: 'Table Title 2',
            tasks: [
                {
                    name: 'New Task',
                    date: new Date(),
                    status: 'not_started',
                },
            ],
        },
    ]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearTool());
        };
    }, []);

    useEffect(() => {
        if (isLogin) {
            getAllTables();
        }
    }, [tools]);

    const handleHeaderLite = (value) => {
        setLite(value);
    };

    const handleAddTable = async () => {
        if (isLogin) {
            await axiosInstance.post(`/table`, { workspace: indexTB, name: 'New Table' });
            await getAllTables();
        } else {
            dispatch(requireLogin(true));
        }
    };

    const handleDeleteTable = async (index) => {
        if (isLogin) {
            await axiosInstance.delete(`/table/${index}`);
            await getAllTables();
        } else {
            dispatch(requireLogin(true));
        }
    };

    const handleEditTable = async (value, index) => {
        if (isLogin) {
            await axiosInstance.patch(`/table/${index}`, { name: value });
            await getAllTables();
        } else {
            dispatch(requireLogin(true));
        }
    };

    const getAllTables = async () => {
        setLoading(true);
        try {
            const tables = await axiosInstance.get(
                `/workspace/${indexTB}/tables?query=${tools.search ?? ''}&&tableId=${
                    tools.filter.group ?? ''
                }&&dueDate=${tools.filter.date ?? ''}&&status=${tools.filter.status ?? ''}&&sortBy=${
                    tools.sortBy ?? ''
                }&sortOrder=${tools.sortOrder ?? ''}`,
            );
            setTables(tables.data);
            return tables.data;
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('task-board-wrapper')}>
            {loading && (
                <div>
                    <div className={cx('overlay', { loading })}>
                        <PuffLoader color="#fafafa" size={80} />
                    </div>
                </div>
            )}
            <TablesInWorkspace.Provider value={[getAllTables, setTables]}>
                <div className={cx('task-board-inner')}>
                    <div className={cx('task-board', { lite })}>
                        <HeaderTaskBoard
                            taskBoard={taskBoard}
                            tables={taskBoard.tables}
                            handleHeaderLite={handleHeaderLite}
                        ></HeaderTaskBoard>
                    </div>
                    <div className={cx('body-task-board', { lite })}>
                        {tables?.map((table, index) => (
                            <div key={index}>
                                <TableValue.Provider value={[table, getAllTables, setTables]}>
                                    <>
                                        <TaskTableHeader
                                            key={index}
                                            handleEditTable={handleEditTable}
                                            handleDeleteTable={handleDeleteTable}
                                            hide={false}
                                            table={table}
                                            taskBoard={taskBoard}
                                        >
                                            <TaskTableBody
                                                indexTB={indexTB}
                                                key={index}
                                                index={table._id}
                                                tasks={table.tasks}
                                            />
                                        </TaskTableHeader>
                                    </>
                                </TableValue.Provider>
                            </div>
                        ))}
                        {tables?.length === 0 && (
                            <div>
                                <TaskBoardEmpty tables />
                            </div>
                        )}
                        {tables?.length > 0 && (
                            <div className={cx('task-add-table')} onClick={handleAddTable}>
                                <FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />
                                Add new table
                            </div>
                        )}
                    </div>
                </div>
            </TablesInWorkspace.Provider>
        </div>
    );
}

export default TaskBoard;
