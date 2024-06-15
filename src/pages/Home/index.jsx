import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Home.module.scss';
import HeaderHome from './Header/HeaderHome';
import ContentItem from './Body/ContentItem';
import images from '~/assets/images';
import TaskBoardItem from '~/layouts/components/Sidebar/TaskBoardList/TaskBoardItem';
import Logo from '~/components/Logo/Logo';
import WorkChoiceIcon from '~/layouts/components/Sidebar/WorkChoiceIcon';
import { taskBoardsSelector } from '~/redux/selectors';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const taskBoards = useSelector(taskBoardsSelector);
    return (
        <div className={cx('wrapper')}>
            <HeaderHome></HeaderHome>
            <div className={cx('home-body')}>
                <div className={cx('main-container')}>
                    <div className={cx('main-content')}>
                        <ContentItem icon={images.arrowRightIcon} title="Recently visited">
                            <div className={cx('task-boards')}>
                                {taskBoards.map((item, index) => (
                                    <Link key={index} className={cx('task-board-lite')} to={item.config}>
                                        <img
                                            className={cx('task-img')}
                                            src="https://cdn.monday.com/images/quick_search_recent_board.svg"
                                            alt=""
                                        ></img>
                                        <TaskBoardItem large icon={images.favouriteIcon} to={item.config} noLink>
                                            {item.name}
                                        </TaskBoardItem>
                                        <Logo small>work managerment {'>'} Main workspace</Logo>
                                    </Link>
                                ))}
                            </div>
                        </ContentItem>
                        <ContentItem icon={images.arrowRightIcon} notify title="Inbox">
                            <div className={cx('inbox')}>
                                <div className={cx('inbox-item')}>
                                    <img
                                        className={cx('inbox-image')}
                                        src="https://cdn.monday.com/images/damann.jpg"
                                        alt=""
                                    ></img>
                                    <div className={cx('inbox-content')}>
                                        <div>Roy Mann</div>
                                        <div>
                                            Hi <a href="/">@Ninh</a>,
                                        </div>
                                    </div>
                                    <div className={cx('inbox-timed')}>
                                        <img src={images.clockIcon} alt=""></img>
                                        {'6d'}
                                    </div>
                                </div>
                            </div>
                        </ContentItem>
                        <ContentItem iconRight={images.moreInfoIcon} icon={images.arrowRightIcon} title="My workspaces">
                            <div className={cx('my-workspace')}>
                                <WorkChoiceIcon>
                                    <div>
                                        Main workspace
                                        <Logo small>Work managerment</Logo>
                                    </div>
                                </WorkChoiceIcon>
                            </div>
                        </ContentItem>
                    </div>
                </div>
                <div className={cx('right-container')}>
                    <div>
                        <h3 className={cx('right-container-title')}>Learn & get inspired</h3>
                        <div className={cx('right-container-item')}>
                            <img src="https://cdn.monday.com/images/learning-center/get-started-2.svg" alt="" />
                            <div className={cx('right-container-item-content')}>
                                <h4>Getting started</h4>
                                <div>Learn how monday.com works</div>
                            </div>
                        </div>
                        <div className={cx('right-container-item')}>
                            <img src="https://cdn.monday.com/images/learning-center/help-center.svg" alt="" />
                            <div className={cx('right-container-item-content')}>
                                <h4>Help center</h4>
                                <div>Learn and get support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
