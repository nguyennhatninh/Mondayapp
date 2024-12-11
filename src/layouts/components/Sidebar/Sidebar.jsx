/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useContext, useEffect, useState } from 'react';
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
import TaskBoardEmpty from './TaskBoardList/TaskBoardEmpty';
import axiosInstance from '~/axiosConfig';
import { useDispatch } from 'react-redux';
import { requireLogin } from '~/redux/actions';
import { MyTaskBoardValue } from '~/App';

const cx = classNames.bind(styles);

function Sidebar(show) {
    const dispatch = useDispatch();
    const myTaskBoardsValue = useContext(MyTaskBoardValue);
    const data = myTaskBoardsValue?.[0];
    const getNewData = myTaskBoardsValue?.[1];
    const isLogin = !!localStorage.getItem('accessToken');
    const [visible, setVisible] = useState(true);
    const [myTaskBoards, setTaskBoards] = useState(data ? data : [{ name: 'New Workspace' }]);

    useEffect(() => {
        if (isLogin) {
            setTaskBoards(data);
        }
    }, [data]);

    const handleAddTaskBoard = async () => {
        if (isLogin) {
            try {
                await axiosInstance.post('/workspace');
                await getNewData();
            } catch (error) {
                console.error('Error adding task board:', error);
            }
        } else {
            dispatch(requireLogin(true));
        }
    };

    const handleSetInputValue = (value) => {
        if (value.trim() === '') {
            setTaskBoards(data);
        } else {
            const filtered = myTaskBoards.filter((taskBoard) =>
                taskBoard.name.toLowerCase().includes(value.toLowerCase()),
            );
            setTaskBoards(filtered);
        }
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
                                {myTaskBoards?.length > 0 ? (
                                    myTaskBoards.map((taskBoard) => (
                                        <TaskBoardItem
                                            to={`/TaskBoard/${taskBoard._id}`}
                                            key={taskBoard._id}
                                            index={taskBoard._id}
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
