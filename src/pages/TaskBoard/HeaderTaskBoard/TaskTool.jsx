import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './TaskTool.module.scss';
import Button from '~/components/Button/Button';
import Search from '~/components/Search/Search';
import TaskToolItem from './TaskToolItem';
import images from '~/assets/images';
import { addTaskTable, editHideTool, searchTaskTable } from '~/redux/actions';
import SortTool from './SortTool';

const cx = classNames.bind(styles);

function TaskTool({ indexTB }) {
    const [renderToolItem, setRenderToolItem] = useState({ person: false, filter: false, sort: false, hide: false });

    // checkboxes toolHide
    const [checkboxes, setCheckboxes] = useState(
        JSON.parse(localStorage.getItem(`toolHide${indexTB}`)) || [true, true, true],
    );
    const [checkedAll, setCheckedAll] = useState(checkboxes.includes(false) ? false : true);

    const iconsHide = [faCalendar, faCircleUser, faListCheck];
    const toolItems = {
        labels: ['Date', 'Person', 'Status'],
        icon: [
            'https://cdn.monday.com/images/column-store/columns/date-column-icon.svg',
            'https://cdn.monday.com/images/column-store/columns/multiple-person-column-icon.svg',
            'https://cdn.monday.com/images/column-store/columns/color-column-icon.svg',
        ],
    };

    const dispatch = useDispatch();

    const handleEditHideTool = (checkboxes) => {
        dispatch(
            editHideTool({
                index: indexTB,
                hideToolValue: checkboxes,
            }),
        );
    };
    const handleAddTaskTable = (value) => {
        dispatch(addTaskTable({ value: value, index: indexTB }));
    };
    const handleSetInputValue = (value) => {
        dispatch(searchTaskTable({ value: value, index: indexTB }));
    };
    useEffect(() => {
        handleEditHideTool(checkboxes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkboxes]);

    useEffect(() => {
        return () => {
            handleSetInputValue(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hideTool = () => (
        <div className={cx('tool-hide')}>
            <div>Choose column to display</div>
            <div className={cx('tool-hide-item')}>
                All columns
                <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={() => {
                        setCheckedAll(!checkedAll);
                        setCheckboxes([!checkedAll, !checkedAll, !checkedAll]);
                        localStorage.setItem(
                            `toolHide${indexTB}`,
                            JSON.stringify([!checkedAll, !checkedAll, !checkedAll]),
                        );
                        handleEditHideTool([!checkedAll, !checkedAll, !checkedAll]);
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
                        checked={checkboxes[index]}
                        onChange={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[index] = !checkboxes[index];
                            setCheckboxes(newCheckboxes);
                            localStorage.setItem(`toolHide${indexTB}`, JSON.stringify(newCheckboxes));
                            if (newCheckboxes[index] === false) {
                                setCheckedAll(false);
                            } else if (!newCheckboxes.includes(false)) {
                                setCheckedAll(true);
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
    const sortTool = () => (
        <div>
            <SortTool toolItems={toolItems} blur={renderToolItem.sort === false} />
        </div>
    );
    return (
        <div className={cx('task-tool')}>
            <Button small primary onClick={() => handleAddTaskTable('New Task')}>
                New Task
            </Button>
            <Search
                key={1}
                lite
                iconLeft={images.searchIcon}
                placeholder="Search"
                iconCustom={images.searchOptions}
                contentIcon={'Search options'}
                handleSetInputValue={handleSetInputValue}
            />
            <div>
                <Tippy
                    interactive
                    visible={renderToolItem.person}
                    render={() => <div>Hello</div>}
                    placement="bottom"
                    onClickOutside={() => setRenderToolItem({ person: false })}
                >
                    <div onClick={() => setRenderToolItem({ person: true })}>
                        <TaskToolItem leftIcon={images.personIcon}>Person</TaskToolItem>
                    </div>
                </Tippy>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={renderToolItem.filter}
                    render={() => <div>Hello</div>}
                    placement="bottom"
                    onClickOutside={() => setRenderToolItem({ filter: false })}
                >
                    <div onClick={() => setRenderToolItem({ filter: true })}>
                        <TaskToolItem leftIcon={images.filterIcon}>Filter</TaskToolItem>
                    </div>
                </Tippy>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={renderToolItem.sort}
                    render={sortTool}
                    placement="bottom"
                    onClickOutside={() => {
                        setRenderToolItem({ sort: false });
                    }}
                >
                    <div onClick={() => setRenderToolItem({ sort: true })}>
                        <TaskToolItem leftIcon={images.sortIcon}>Sort</TaskToolItem>
                    </div>
                </Tippy>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={renderToolItem.hide}
                    render={hideTool}
                    placement="bottom"
                    onClickOutside={() => setRenderToolItem({ hide: false })}
                >
                    <div onClick={() => setRenderToolItem({ hide: true })}>
                        <TaskToolItem leftIcon={images.hideIcon}>
                            {checkboxes.includes(false)
                                ? `Hide / ${checkboxes.filter((el) => el === false).length}`
                                : 'Hide'}
                        </TaskToolItem>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default TaskTool;
