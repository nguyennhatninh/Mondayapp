import classNames from 'classnames/bind';

import styles from './HeaderTaskBoard.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Tippy from '@tippyjs/react';
import TaskViewItem from './TaskViewItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import TaskTool from './TaskTool/TaskTool';

const cx = classNames.bind(styles);

function HeaderTaskBoard({ handleHeaderLite, taskBoard, tables }) {
    const taskViews = ['Main Table', 'Chart', 'Table'];
    const [active, setActive] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [collapseHeader, setcollapseHeader] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener('scroll', listenToScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collapseHeader]);

    const listenToScroll = () => {
        let heightToHideFrom = 40;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            setIsVisible(false);
            handleHeaderLite(true);
        } else {
            if (collapseHeader) {
                setIsVisible(false);
                handleHeaderLite(true);
            } else {
                setIsVisible(true);
                handleHeaderLite(false);
            }
        }
    };
    return (
        <div className={cx('header-task-board')}>
            {isVisible && (
                <div className={cx('header-task-main')}>
                    <div className={cx('header-task-title')}>
                        <div className={cx('task-title-left')}>
                            {taskBoard.name}
                            <Tippy delay={[300, 0]} content="Show board description">
                                <img src={images.moreInfoIcon} alt="" />
                            </Tippy>
                            <Tippy delay={[300, 0]} content="Add to favourites">
                                <img src={images.favouriteIcon} alt="" />
                            </Tippy>
                        </div>
                        <div className={cx('task-title-right')}>
                            <Button className={cx('activity-btn')} small>
                                Activity{' '}
                                <Tippy placement="bottom" content="Ninh viewed just now">
                                    <img
                                        className={cx('avarta')}
                                        src="https://files.monday.com/use1/photos/43954248/thumb_small/43954248-user_photo_initials_2023_05_31_15_01_39.png?1685545299"
                                        alt=""
                                    />
                                </Tippy>
                            </Button>
                            <Button className={cx('invite-btn')} small outline>
                                <img className={cx('invite-icon')} src={images.userPlusIcon} alt="" />
                                Invite / 1
                            </Button>
                            <img className={cx('menu-icon')} src={images.threeDotsIcon} alt="" />
                        </div>
                    </div>
                    <div className={cx('header-task-description')}>
                        Manage any type of project. Assign owners, set timelines and keep track of where your project
                        stands.
                    </div>
                </div>
            )}
            <div className={cx('header-task-subset')}>
                <div className={cx('header-task-view')}>
                    {!isVisible && (
                        <div style={{ marginRight: 20 }} className={cx('task-title-left')}>
                            ninh
                        </div>
                    )}
                    {taskViews.map((viewItem, index) => (
                        <TaskViewItem
                            key={index}
                            index={index}
                            isActive={active === index}
                            onClick={setActive}
                            rightIcon={images.threeDotsIcon}
                        >
                            {viewItem}
                        </TaskViewItem>
                    ))}
                    <Tippy placement="right" content="Add view">
                        <div>
                            <FontAwesomeIcon className={cx('plus-icon')} icon={faPlus} />
                        </div>
                    </Tippy>
                </div>
                <div style={{ display: 'flex' }}>
                    {!isVisible && (
                        <div className={cx('task-title-right')}>
                            <Button className={cx('invite-btn')} small outline>
                                <img className={cx('invite-icon')} src={images.userPlusIcon} alt="" />
                                Invite / 1
                            </Button>
                            <img className={cx('menu-icon')} src={images.threeDotsIcon} alt="" />
                        </div>
                    )}
                    {isVisible && (
                        <Tippy content="Collapse header">
                            <img
                                onClick={() => {
                                    setIsVisible(false);
                                    setcollapseHeader(true);
                                    handleHeaderLite(true);
                                }}
                                className={cx('collapse-header')}
                                src={images.arrowUpIcon}
                                alt=""
                            />
                        </Tippy>
                    )}
                    {collapseHeader && (
                        <Tippy content="Expand header">
                            <img
                                onClick={() => {
                                    setIsVisible(true);
                                    setcollapseHeader(false);
                                    handleHeaderLite(false);
                                }}
                                className={cx('collapse-header')}
                                src={images.arrowDownIcon}
                                alt=""
                            />
                        </Tippy>
                    )}
                </div>
            </div>
            <div className={cx('header-task-tool')}>
                <TaskTool tables={tables} taskBoard={taskBoard} />
            </div>
        </div>
    );
}

export default HeaderTaskBoard;
