import classNames from 'classnames/bind';

import styles from './TaskBoard.modules.scss';
import HeaderTaskBoard from './HeaderTaskBoard/HeaderTaskBoard';
import TaskTableHeader from './BodyTaskBoard/TaskTableHeader';
import TaskTableBody from './BodyTaskBoard/TaskTableBody';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import TaskBoardEmpty from '~/layouts/components/Sidebar/TaskBoardList/TaskBoardEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { groupFilterSelector } from '~/redux/selectors';
import { requireLogin } from '~/redux/actions';

const cx = classNames.bind(styles);

function TaskBoard({ title, main, indexTB }) {
    const isLogin = !!localStorage.getItem('access_token');
    const keys = ['status', 'taskItems', 'date'];

    const [lite, setLite] = useState(false);
    const [tables, setTables] = useState(
        JSON.parse(localStorage.getItem(`tables${indexTB}`)) ||
            (main ? ['This week', ' Next Week'] : [' Table Title', ' Table Title']),
    );
    const [showTablesIndex, setShowTablesIndex] = useState([]);
    const dispatch = useDispatch();
    const groupFilterData = useSelector(groupFilterSelector);

    useEffect(() => {
        localStorage.setItem(`tables${indexTB}`, JSON.stringify(tables));
        setTables(tables);
    }, [tables, indexTB]);

    const moveItem = (key, indexTB, index) => {
        const nextIndex = index + 1;
        // xoa table hien tai va cap nhat du lieu tu table ke tiep
        const item = JSON.parse(localStorage.getItem(`${key}-${indexTB}-${nextIndex}`));
        localStorage.setItem(`${key}-${indexTB}-${index}`, JSON.stringify(item));
        localStorage.removeItem(`${key}-${indexTB}-${nextIndex}`);
    };

    const handleHeaderLite = (value) => {
        setLite(value);
    };

    const handleAddTable = () => {
        if (isLogin) {
            setTables((prev) => [...prev, ' Table Title']);
        } else {
            dispatch(requireLogin(true));
        }
    };

    const handleDeleteTable = (index) => {
        const newTables = [...tables];
        newTables.splice(index, 1);
        keys.forEach((key) => {
            if (index < newTables.length) {
                for (let i = index; i < newTables.length; i++) {
                    moveItem(key, indexTB, i);
                }
            } else {
                localStorage.removeItem(`${key}-${indexTB}-${index}`);
            }
        });
        setTables(newTables);
    };

    const handleChangeValueTable = (value, index) => {
        tables.splice(index, 1, value);
        setTables([...tables]);
    };

    const handleSearchTaskTable = (index) => {
        // Tra ve null la co ket qua search
        if (index === null) {
            setShowTablesIndex([]);
        } else if (index === undefined) {
            // Tra ve undefined la search chuoi rong ''
            setShowTablesIndex([]);
        } else {
            Promise.resolve().then(() => {
                setShowTablesIndex((prev) => [...prev, index]);
            });
        }
    };
    const handleCheckAllIndex = (arr) => {
        const indexArrTables = [...Array(tables.length).keys()];
        return indexArrTables.every((element) => arr.includes(element));
    };

    return (
        <div className={cx('task-board-wrapper')}>
            <div className={cx('task-board-inner')}>
                <div className={cx('task-board', { lite })}>
                    <HeaderTaskBoard
                        indexTB={indexTB}
                        title={title}
                        handleHeaderLite={handleHeaderLite}
                    ></HeaderTaskBoard>
                </div>
                <div className={cx('body-task-board', { lite })}>
                    {tables.map((table, index) => (
                        <div key={index}>
                            <TaskTableHeader
                                indexTB={indexTB}
                                key={index}
                                index={index}
                                title={table}
                                handleChangeValueTable={handleChangeValueTable}
                                handleDeleteTable={handleDeleteTable}
                                hide={
                                    showTablesIndex.includes(index) ||
                                    (groupFilterData.index !== null && index !== groupFilterData.index)
                                }
                            >
                                <TaskTableBody
                                    indexTB={indexTB}
                                    key={index}
                                    index={index}
                                    handleSearchTaskTable={handleSearchTaskTable}
                                />
                            </TaskTableHeader>
                        </div>
                    ))}
                    {handleCheckAllIndex(showTablesIndex) && (
                        <div>
                            <TaskBoardEmpty tables={tables.length} />
                        </div>
                    )}
                    <div className={cx('task-add-table')} onClick={handleAddTable}>
                        <FontAwesomeIcon className={cx('icon-plus')} icon={faPlus} />
                        Add new table
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskBoard;
