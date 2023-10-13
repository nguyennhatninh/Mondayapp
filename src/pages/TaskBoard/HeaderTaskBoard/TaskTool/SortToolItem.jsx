import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortTool } from '~/redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpShortWide, faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './TaskTool.module.scss';
import images from '~/assets/images';
import { IndexContext } from '~/App';

const cx = classNames.bind(styles);

function SortToolItem({ icon, blur, id, index, label, onDragEnd }) {
    const indexTB = useContext(IndexContext);

    const [toolSort, setToolSort] = useState(null);
    const [renderToolSort, setRenderToolSort] = useState(false);
    useEffect(() => {
        if (blur) {
            setRenderToolSort(false);
        }
    }, [blur]);

    useEffect(() => {
        handleSortTool(toolSort);
        return () => {
            if (toolSort != null) {
                handleSortTool(null);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolSort]);
    const dispatch = useDispatch();

    const handleSortTool = (value) => {
        dispatch(sortTool({ sortToolValue: value, label: label, index: index, indexTB: indexTB }));
    };
    const handleDragStart = (event) => {
        event.dataTransfer.setData('indexStart', index);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const startIndex = Number(event.dataTransfer.getData('indexStart'));
        const endIndex = index;
        onDragEnd(startIndex, endIndex);
    };

    return (
        <div draggable onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className={cx('tool-sort-item', `color${id}`)}>
                <div className={cx('sort-item-title')}>
                    <img src={icon} alt="" />
                    {label}
                </div>
                <div>
                    <Tippy
                        interactive
                        visible={renderToolSort}
                        placement="bottom"
                        onClickOutside={() => {
                            setRenderToolSort(false);
                        }}
                        render={() => (
                            <div className={cx('sort-item-render')}>
                                <div
                                    className={cx('render-item')}
                                    onClick={() => {
                                        setToolSort(null);
                                        setRenderToolSort(false);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                    <div>Normal</div>
                                </div>
                                <div
                                    className={cx('render-item')}
                                    onClick={() => {
                                        setToolSort(true);
                                        setRenderToolSort(false);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowDownShortWide} />
                                    <div>Ascending</div>
                                </div>
                                <div
                                    className={cx('render-item')}
                                    onClick={() => {
                                        setToolSort(false);
                                        setRenderToolSort(false);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowUpShortWide} />
                                    <div>Descending</div>
                                </div>
                            </div>
                        )}
                    >
                        <div
                            className={cx('sort-item-state', renderToolSort && 'render')}
                            onClick={() => setRenderToolSort(!renderToolSort)}
                        >
                            <FontAwesomeIcon
                                icon={
                                    toolSort !== null
                                        ? (toolSort === true && faArrowDownShortWide) ||
                                          (toolSort === false && faArrowUpShortWide)
                                        : faBars
                                }
                            />
                            <div>
                                {toolSort !== null
                                    ? (toolSort === true && 'Ascending') || (toolSort === false && 'Descending')
                                    : 'Normal'}
                            </div>
                            <img src={images.arrowDownIcon} alt="" />
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default SortToolItem;
