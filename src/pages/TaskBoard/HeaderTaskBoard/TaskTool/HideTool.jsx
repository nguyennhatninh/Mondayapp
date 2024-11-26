import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './TaskTool.module.scss';
import axiosInstance from '~/axiosConfig';
import { TaskBoardValue } from '~/App';

const cx = classNames.bind(styles);

function HideTool({ indexTB, toolItems }) {
    const taskBoardValue = useContext(TaskBoardValue)[0];
    const handleUpdate = useContext(TaskBoardValue)[1];

    const [taskBoard, setTaskBoard] = useState(taskBoardValue);
    const init = taskBoardValue.date && taskBoardValue.status && taskBoardValue.person;
    const [checkAll, setCheckAll] = useState(init);
    const iconsHide = [faCalendar, faCircleUser, faListCheck];

    useEffect(() => {
        getTaskBoard();
    }, [checkAll]);

    const handleHideToolAll = async (boolean) => {
        await axiosInstance.patch(`/workspace/${indexTB}`, {
            date: boolean,
            person: boolean,
            status: boolean,
        });
        setCheckAll(boolean);
        getTaskBoard();
        await handleUpdate();
    };

    const handleEditHide = async (label, boolean) => {
        await axiosInstance.patch(`/workspace/${indexTB}`, {
            [label]: boolean,
        });
        boolean === false && setCheckAll(false);
        const value = await getTaskBoard();
        value.date && value.status && value.person && setCheckAll(true);
        await handleUpdate();
    };

    const getTaskBoard = async () => {
        const taskBoard = await axiosInstance.get(`/workspace/${indexTB}`);
        setTaskBoard(taskBoard.data);
        return taskBoard.data;
    };

    return (
        <div className={cx('tool-hide')}>
            <div>Choose column to display</div>
            <div className={cx('tool-hide-item')}>
                All columns
                <input
                    type="checkbox"
                    checked={checkAll}
                    onChange={() => {
                        handleHideToolAll(!checkAll);
                    }}
                />
            </div>
            {toolItems.labels.map((label, index) => (
                <div className={cx('tool-hide-item')} key={index}>
                    <div>
                        <FontAwesomeIcon icon={iconsHide[index]} />
                        {label}
                    </div>
                    <input
                        type="checkbox"
                        checked={taskBoard?.[label.toLowerCase()]}
                        onChange={() => {
                            handleEditHide(label.toLowerCase(), !taskBoard?.[label.toLowerCase()]);
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default HideTool;
