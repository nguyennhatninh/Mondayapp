import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import styles from './TaskTableHeader.module.scss';
import { requireLogin } from '~/redux/actions';

const cx = classNames.bind(styles);

function TaskTableHeader({ children, handleEditTable, handleDeleteTable, hide, taskBoard, table }) {
    const isLogin = !!localStorage.getItem('accessToken');
    const states = ['done', 'working_on_it', 'stuck', 'not_started'];
    const status = table.tasks?.map((item) => item.status);
    const valueDate = table.tasks?.map((item) => item.date);

    const dispatch = useDispatch();

    const [show, setShow] = useState(true);
    const [inputValue, setInputValue] = useState(table.name);
    const [render, setRender] = useState(false);

    const inputRef = useRef();
    const sortedDates = valueDate ? valueDate.sort((a, b) => moment(a, ['MM/DD/YY']) - moment(b, ['MM/DD/YY'])) : [];
    const nearestDate = sortedDates[0];
    const farthestDate = sortedDates[sortedDates.length - 1];

    useEffect(() => {
        setInputValue(table.name);
    }, [table.name]);

    const handleSetInputValue = (e) => {
        setInputValue(e.target.value);
    };

    const handleShow = () => {
        setShow(!show);
    };
    const renderTaskTablePanel = () => (
        <div className={cx('task-table-panel')}>
            <div
                className={cx('table-panel-item')}
                onClick={() => {
                    if (isLogin) {
                        inputRef.current.focus();
                        setRender(false);
                    } else {
                        dispatch(requireLogin(true));
                    }
                }}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
                Rename Table
            </div>
            <div
                className={cx('table-panel-item')}
                onClick={() => {
                    if (isLogin) {
                        handleDeleteTable(table._id);
                        setRender(false);
                    } else {
                        dispatch(requireLogin(true));
                    }
                }}
            >
                <FontAwesomeIcon icon={faTrashCan} />
                Delete
            </div>
        </div>
    );
    return (
        <div
            className={cx(
                'task-table',
                !show && 'collapsed',
                !show && table._id !== 0 && `color0`,
                !show && table._id === 0 && 'color0',
                { hide },
            )}
        >
            <div>
                <Tippy
                    interactive
                    visible={render}
                    render={renderTaskTablePanel}
                    placement="top"
                    onClickOutside={() => setRender(false)}
                >
                    <div className={cx('table-title-option')} onClick={() => setRender(true)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            </div>
            <div>
                <div className={cx('table-title', `color${table._id}`)}>
                    <FontAwesomeIcon
                        onClick={handleShow}
                        className={cx('table-title-icon', { show })}
                        icon={faChevronDown}
                    />
                    <input
                        ref={inputRef}
                        className={cx('table-title-input', { show })}
                        value={inputValue}
                        onChange={handleSetInputValue}
                        onBlur={(e) => handleEditTable(e.target.value, table._id)}
                    />
                </div>
                {show && (
                    <div>
                        <div className={cx('table-header', `color0`)}>
                            <div className={cx('table-header-task')}>Task</div>
                            <div className={cx('table-header-categories')}>
                                {taskBoard.date || !isLogin ? (
                                    <div className={cx('table-header-category')}>Due date</div>
                                ) : null}
                                {taskBoard.person || !isLogin ? (
                                    <div className={cx('table-header-category')}>Person</div>
                                ) : null}
                                {taskBoard.status || !isLogin ? (
                                    <div className={cx('table-header-category')}>Status</div>
                                ) : null}
                                {!taskBoard.date && !taskBoard.person && !taskBoard.status && isLogin && (
                                    <div className={cx('table-header-category')}></div>
                                )}
                            </div>
                        </div>
                        {children}
                    </div>
                )}
                {!show && (
                    <div className={cx('task-table-count')}>
                        {table.tasks ? `${table.tasks.length} Tasks` : 'No tasks'}
                    </div>
                )}
            </div>
            {!show && (
                <div className={cx('task-table-summaries')}>
                    <div className={cx('task-table-summary')}>
                        Due date
                        <div className={cx('summary-duration')}>
                            {dayjs(`${nearestDate}`).format('MMM D')} - {dayjs(`${farthestDate}`).format('MMM D')}
                        </div>
                    </div>
                    <div className={cx('task-table-summary')}></div>
                    <div className={cx('task-table-summary')}>
                        Status
                        <div className={cx('summary-status')}>
                            {status ? (
                                states.map((state, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: `${
                                                (status.filter((status) => status === state).length / status.length) *
                                                100
                                            }%`,
                                        }}
                                        className={cx(`status${index}`)}
                                    ></div>
                                ))
                            ) : (
                                <div key={table._id} style={{ width: `100%`, opacity: 0.5 }} className={cx(`status3`)}>
                                    ---
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskTableHeader;
