// Component cha (SortTool)
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './TaskTool.module.scss';
import SortToolItem from './SortToolItem';
const cx = classNames.bind(styles);

function SortTool({ toolItems, blur }) {
    const [sortToolItems, setSortToolItems] = useState([
        { id: 0, labels: toolItems.labels[0], icon: toolItems.icon[0] },
        { id: 1, labels: toolItems.labels[1], icon: toolItems.icon[1] },
        { id: 2, labels: toolItems.labels[2], icon: toolItems.icon[2] },
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
                    index={index}
                    blur={blur}
                    onDragEnd={handleSortToolItemDragEnd}
                />
            ))}
        </div>
    );
}

export default SortTool;
