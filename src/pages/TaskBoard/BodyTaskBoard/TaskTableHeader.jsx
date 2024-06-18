import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import styles from './TaskTableHeader.module.scss';
import { hideToolSelector } from '~/redux/selectors';
import { requireLogin } from '~/redux/actions';

const cx = classNames.bind(styles);

function TaskTableHeader({ title, index, children, indexTB, handleChangeValueTable, handleDeleteTable, hide }) {
    const isLogin = !!localStorage.getItem('access_token');
    const states = ['Done', 'Working on it', 'Stuck', 'Not Started'];
    const tableItemData = JSON.parse(localStorage.getItem(`taskItems-${indexTB}-${index}`));
    const status = tableItemData?.map((item) => item.status);
    const valueDate = tableItemData?.map((item) => item.valueDate);

    const dispatch = useDispatch();
    const hideTool = useSelector(hideToolSelector);

    const [show, setShow] = useState(true);
    const [inputValue, setInputValue] = useState(title);
    const [render, setRender] = useState(false);

    const inputRef = useRef();
    const sortedDates = valueDate ? valueDate.sort((a, b) => moment(a, ['MM/DD/YY']) - moment(b, ['MM/DD/YY'])) : [];
    const nearestDate = sortedDates[0];
    const farthestDate = sortedDates[sortedDates.length - 1];

    useEffect(() => {
        setInputValue(title);
    }, [title]);

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
                        handleDeleteTable(index);
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
                !show && index !== 0 && `color${index}`,
                !show && index === 0 && 'color0',
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
                <div className={cx('table-title', `color${index}`)}>
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
                        onBlur={(e) => handleChangeValueTable(e.target.value, index)}
                    />
                </div>
                {show && (
                    <div>
                        <div className={cx('table-header', `color${index}`)}>
                            <div className={cx('table-header-task')}>Task</div>
                            <div className={cx('table-header-categories')}>
                                {(indexTB === hideTool.index && hideTool.hideToolValue[0] === true) ||
                                indexTB !== hideTool.index ? (
                                    <div className={cx('table-header-category')}>Due date</div>
                                ) : null}
                                {(indexTB === hideTool.index && hideTool.hideToolValue[1] === true) ||
                                indexTB !== hideTool.index ? (
                                    <div className={cx('table-header-category')}>Person</div>
                                ) : null}
                                {(indexTB === hideTool.index && hideTool.hideToolValue[2] === true) ||
                                indexTB !== hideTool.index ? (
                                    <div className={cx('table-header-category')}>Status</div>
                                ) : null}
                                {!hideTool.hideToolValue.includes(true) && (
                                    <div className={cx('table-header-category')}></div>
                                )}
                            </div>
                        </div>
                        {children}
                    </div>
                )}
                {!show && (
                    <div className={cx('task-table-count')}>
                        {tableItemData ? `${tableItemData.length} Tasks` : 'No tasks'}
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
                                <div key={index} style={{ width: `100%`, opacity: 0.5 }} className={cx(`status3`)}>
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
