import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect, memo, useContext } from 'react';
import styles from './TaskTool.module.scss';
import Button from '~/components/Button/Button';
import Search from '~/components/Search/Search';
import TaskToolItem from './TaskToolItem';
import images from '~/assets/images';
import SortTool from './SortTool';
import HideTool from './HideTool';
import FilterTool from './FilterTool';
import PersonTool from './PersonTool';
import { TablesInWorkspace } from '../..';
import axiosInstance from '~/axiosConfig';
import { useDispatch } from 'react-redux';
import { searchTool } from '~/redux/actions';

const cx = classNames.bind(styles);

function TaskTool({ tables, taskBoard }) {
    const dispatch = useDispatch();

    const [renderToolItem, setRenderToolItem] = useState({ person: false, filter: false, sort: false, hide: false });
    const tablesInWorkspace = useContext(TablesInWorkspace);
    const toolItems = {
        labels: ['Date', 'Person', 'Status'],
        icon: [
            'https://cdn.monday.com/images/column-store/columns/date-column-icon.svg',
            'https://cdn.monday.com/images/column-store/columns/multiple-person-column-icon.svg',
            'https://cdn.monday.com/images/column-store/columns/color-column-icon.svg',
        ],
    };

    const countHideColumns = toolItems.labels.filter((el) => taskBoard[el.toLowerCase()] === false).length;

    const handleAddTaskTable = async (value) => {
        await axiosInstance.post(`/task`, { name: value, table: taskBoard.tables[0]._id });
        tablesInWorkspace[0]();
    };

    const handleSetInputValue = async (value) => {
        dispatch(searchTool(value));
    };

    useEffect(() => {
        return () => {
            handleSetInputValue(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hideTool = () => (
        <div>
            <HideTool toolItems={toolItems} indexTB={taskBoard._id} />
        </div>
    );

    const sortTool = () => (
        <div>
            <SortTool toolItems={toolItems} blur={renderToolItem.sort === false} />
        </div>
    );

    const filterTool = () => (
        <div>
            <FilterTool tables={tables} indexTB={taskBoard._id} />
        </div>
    );

    const personTool = () => (
        <div>
            <PersonTool />
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
                handleSetInputValue={handleSetInputValue}
            />
            <div>
                <Tippy
                    interactive
                    visible={renderToolItem.person}
                    render={personTool}
                    placement="bottom"
                    onClickOutside={() => setRenderToolItem({ person: false })}
                >
                    <div onClick={() => setRenderToolItem({ person: true })}>
                        <TaskToolItem leftIcon={images.personIcon} active={renderToolItem.person}>
                            Person
                        </TaskToolItem>
                    </div>
                </Tippy>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={renderToolItem.filter}
                    render={filterTool}
                    placement="bottom"
                    onClickOutside={() => setRenderToolItem({ filter: false })}
                >
                    <div onClick={() => setRenderToolItem({ filter: true })}>
                        <TaskToolItem leftIcon={images.filterIcon} active={renderToolItem.filter}>
                            Filter
                        </TaskToolItem>
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
                        <TaskToolItem leftIcon={images.sortIcon} active={renderToolItem.sort}>
                            Sort
                        </TaskToolItem>
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
                        <TaskToolItem leftIcon={images.hideIcon} active={renderToolItem.hide}>
                            {countHideColumns > 0 ? `Hide / ${countHideColumns}` : 'Hide'}
                        </TaskToolItem>
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default memo(TaskTool);
