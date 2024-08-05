import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import images from '~/assets/images';
import Button from '~/components/Button/Button';
import styles from './Sidebar.module.scss';
import { NavbarItem } from './Navbar';
import config from '~/config';
import Navbar from './Navbar/Navbar';
import WorkChoiceIcon from './WorkChoiceIcon';
import TaskBoardList from './TaskBoardList/TaskBoardList';
import TaskBoardItem from './TaskBoardList/TaskBoardItem';
import Search from '~/components/Search/Search';
import { addTaskBoard, requireLogin } from '~/redux/actions';
import { taskBoardsSelector } from '~/redux/selectors';
import TaskBoardEmpty from './TaskBoardList/TaskBoardEmpty';

const cx = classNames.bind(styles);

function Sidebar(show) {
    const isLogin = !!localStorage.getItem('accessToken');
    const [visible, setVisible] = useState(true);

    const taskBoards = useSelector(taskBoardsSelector);
    const [resultSearch, setResultSearch] = useState(taskBoards);

    useEffect(() => {
        setResultSearch(taskBoards);
    }, [taskBoards]);

    const dispatch = useDispatch();
    const handleAddTaskBoard = () => {
        if (isLogin) {
            dispatch(
                addTaskBoard({
                    id: uuidv4(),
                    name: 'New Task Board',
                    config: `/TaskBoard/${uuidv4()}`,
                }),
            );
        } else {
            dispatch(requireLogin(true));
        }
    };
    const handleSetInputValue = (value) => {
        const resultValue = taskBoards.filter((taskBoard) => taskBoard.name.includes(value));
        setResultSearch(resultValue);
    };
    return (
        <aside className={cx('wrapper', { visible }, show)}>
            <div className={cx('navbar-fixed', { visible })}>
                {visible ? (
                    <div>
                        <Navbar>
                            <NavbarItem icon={images.homeIcon} to={config.routes.home}>
                                Home
                            </NavbarItem>
                            <NavbarItem icon={images.taskIcon} to={config.routes.myWorkPage}>
                                My work
                            </NavbarItem>
                            <Tippy content={visible ? 'Close Navigation' : 'Open Navigation'}>
                                <img
                                    onClick={() => setVisible(!visible)}
                                    className={cx('closed-nav', { visible })}
                                    src={images.arrowLeftIcon}
                                    alt=""
                                />
                            </Tippy>
                        </Navbar>
                        <div>
                            <div className={cx('workspace')}>
                                <WorkChoiceIcon hover icon={images.arrowDownIcon} small>
                                    Main workspace
                                </WorkChoiceIcon>
                                <img className={cx('options-btn')} src={images.threeDotsIcon} alt="" />
                            </div>
                            <div className={cx('workspace-interaction')}>
                                <Search
                                    key={0}
                                    contentIcon={'Filters'}
                                    iconLeft={images.searchIcon}
                                    placeholder="Search"
                                    iconCustom={images.filterIcon}
                                    handleSetInputValue={handleSetInputValue}
                                />
                                <Button primary square onClick={handleAddTaskBoard}>
                                    <Tippy content="Add item to workspace">
                                        <img src={images.plusIcon} alt="" />
                                    </Tippy>
                                </Button>
                            </div>
                            <TaskBoardList>
                                {resultSearch && resultSearch.length > 0 ? (
                                    resultSearch.map((taskBoard, index) => (
                                        <TaskBoardItem
                                            to={taskBoard.config}
                                            key={taskBoard.id}
                                            index={index}
                                            hover
                                            space
                                            icon={images.threeDotsIcon}
                                        >
                                            {taskBoard.name}
                                        </TaskBoardItem>
                                    ))
                                ) : (
                                    <TaskBoardEmpty />
                                )}
                            </TaskBoardList>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Tippy content={visible ? 'Close Navigation' : 'Open Navigation'}>
                            <img
                                onClick={() => setVisible(!visible)}
                                className={cx('closed-nav', { visible })}
                                src={images.arrowLeftIcon}
                                alt=""
                            />
                        </Tippy>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
