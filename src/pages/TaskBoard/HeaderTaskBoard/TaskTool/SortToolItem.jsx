import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpShortWide, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './TaskTool.module.scss';
import images from '~/assets/images';
import { requireLogin } from '~/redux/actions';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function SortToolItem({ icon, blur, id, index, label, onDragEnd, updateStateSort, state, sortKey }) {
    const isLogin = !!localStorage.getItem('accessToken');

    const dispatch = useDispatch();

    const [renderToolSort, setRenderToolSort] = useState(false);
    useEffect(() => {
        if (blur) {
            setRenderToolSort(false);
        }
    }, [blur]);

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
                                        if (isLogin) {
                                            updateStateSort(sortKey, null);
                                            setRenderToolSort(false);
                                        } else {
                                            dispatch(requireLogin(true));
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                    <div>Normal</div>
                                </div>
                                <div
                                    className={cx('render-item')}
                                    onClick={() => {
                                        if (isLogin) {
                                            updateStateSort(sortKey, null);
                                            setRenderToolSort(false);
                                        } else {
                                            dispatch(requireLogin(true));
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faArrowDownShortWide} />
                                    <div>Ascending</div>
                                </div>
                                <div
                                    className={cx('render-item')}
                                    onClick={() => {
                                        if (isLogin) {
                                            updateStateSort(sortKey, null);
                                            setRenderToolSort(false);
                                        } else {
                                            dispatch(requireLogin(true));
                                        }
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
                                    state !== null
                                        ? (state === true && faArrowDownShortWide) ||
                                          (state === false && faArrowUpShortWide)
                                        : faBars
                                }
                            />
                            <div>
                                {state !== null
                                    ? (state === true && 'Ascending') || (state === false && 'Descending')
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
