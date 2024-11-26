import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './TaskTool.module.scss';
import SortToolItem from './SortToolItem';
import { useDispatch } from 'react-redux';
import { toolSorts } from '~/redux/actions';
const cx = classNames.bind(styles);

function SortTool({ blur }) {
    const dispatch = useDispatch();

    const updateStateSort = (key, value) => {
        setSortToolItems((prevItems) =>
            prevItems.map((item) => (item.key === key ? { ...item, state: value } : { ...item, state: null })),
        );
        if (value !== null) {
            dispatch(toolSorts({ sortBy: key, sortOrder: value === true ? 'asc' : 'desc' }));
        } else {
            dispatch(toolSorts({ sortBy: '', sortOrder: '' }));
        }
    };

    const toolItems = {
        labels: ['Date', 'Task'],
        icon: [
            'https://cdn.monday.com/images/column-store/columns/date-column-icon.svg',
            'https://cdn.monday.com/images/column-store/columns/color-column-icon.svg',
        ],
    };

    const [sortToolItems, setSortToolItems] = useState([
        { id: 0, labels: toolItems.labels[0], icon: toolItems.icon[0], state: null, key: 'date' },
        { id: 1, labels: toolItems.labels[1], icon: toolItems.icon[1], state: null, key: 'name' },
    ]);

    const handleSortToolItemDragEnd = (startIndex, endIndex) => {
        const updatedSortToolItems = [...sortToolItems];
        const [removed] = updatedSortToolItems.splice(startIndex, 1);
        updatedSortToolItems.splice(endIndex, 0, removed);
        setSortToolItems(updatedSortToolItems);
    };

    return (
        <div className={cx('tool-sort')}>
            {sortToolItems.map((sortToolItem, index) => (
                <SortToolItem
                    key={sortToolItem.id}
                    id={sortToolItem.id}
                    label={sortToolItem.labels}
                    icon={sortToolItem.icon}
                    state={sortToolItem.state}
                    index={index}
                    blur={blur}
                    sortKey={sortToolItem.key}
                    updateStateSort={updateStateSort}
                    onDragEnd={handleSortToolItemDragEnd}
                />
            ))}
        </div>
    );
}

export default SortTool;
