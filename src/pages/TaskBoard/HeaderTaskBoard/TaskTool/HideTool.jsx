/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './TaskTool.module.scss';
import axiosInstance from '~/axiosConfig';
import { TaskBoardValue } from '~/App';
import { requireLogin } from '~/redux/actions';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function HideTool({ indexTB, toolItems }) {
    const isLogin = !!localStorage.getItem('accessToken');
    const taskBoardValue = useContext(TaskBoardValue)[0];
    const handleUpdate = useContext(TaskBoardValue)[1];

    const dispatch = useDispatch();

    const [taskBoard, setTaskBoard] = useState(taskBoardValue);
    const init = isLogin ? taskBoardValue.date && taskBoardValue.status && taskBoardValue.person : true;
    const [checkAll, setCheckAll] = useState(init);
    const iconsHide = [faCalendar, faCircleUser, faListCheck];

    useEffect(() => {
        if (isLogin) {
            getTaskBoard();
        }
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
                        checked={isLogin ? taskBoard?.[label.toLowerCase()] : true}
                        onChange={() => {
                            if (isLogin) {
                                handleEditHide(label.toLowerCase(), !taskBoard?.[label.toLowerCase()]);
                            } else {
                                dispatch(requireLogin(true));
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default HideTool;
