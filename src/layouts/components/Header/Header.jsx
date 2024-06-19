import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Logo from '~/components/Logo/Logo';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import Menu from './Menu';
import { loginSelector } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import Navbar, { NavbarItem } from '../Sidebar/Navbar';
import config from '~/config';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
    const isLogin = useSelector(loginSelector);
    const access_token = localStorage.getItem('access_token');
    const [renderMenu, setRenderMenu] = useState(false);
    const [renderSidebar, setRenderSidebar] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    const handelGetInfoUser = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/user/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const data = await response.data.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        async function fetchData() {
            const info = await handelGetInfoUser();
            setUserInfo(info);
        }
        fetchData();
    }, []);
    console.log(userInfo?.avatar);
    const firstLetterLastName = userInfo && userInfo.name.split(' ').pop().charAt(0).toUpperCase();
    const getRandomColor = () => {
        const letters = '234567';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 6)];
        }
        return color;
    };
    const backgroundColor = getRandomColor();

    const contentMenu = () => (
        <div>
            <Menu />
        </div>
    );
    const handleShowSidebar = () => (
        <div className={cx('navbar-lite')}>
            <Navbar>
                <NavbarItem icon={images.homeIcon} to={config.routes.home}>
                    Home
                </NavbarItem>
                <NavbarItem icon={images.taskIcon} to={config.routes.myWorkPage}>
                    My work
                </NavbarItem>
            </Navbar>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('options-icon')}>
                    <Tippy
                        interactive
                        visible={renderSidebar}
                        render={handleShowSidebar}
                        onClickOutside={() => setRenderSidebar(false)}
                        placement="bottom"
                    >
                        <img onClick={() => setRenderSidebar(true)} src={images.optionsIcon} alt="" />
                    </Tippy>
                </div>
                <div className={cx('header')}>
                    <Logo href="/" title={'monday'}>
                        work managerment
                    </Logo>
                    <Button className={cx('header-btn')} small primary outline>
                        See plans
                    </Button>
                </div>
                <div className={cx('actions')}>
                    <img className={cx('header-icon')} src={images.bellIcon} alt="" />
                    <img className={cx('header-icon')} src={images.inboxIcon} alt="" />
                    <img className={cx('header-icon')} src={images.userPlusIcon} alt="" />
                    <img className={cx('header-icon')} src={images.insertIcon} alt="" />
                    <div className={cx('line')}></div>
                    <img className={cx('header-icon')} src={images.searchIcon} alt="" />
                    <img className={cx('header-icon')} src={images.questionIcon} alt="" />
                    {isLogin ? (
                        <div>
                            <Tippy
                                interactive
                                visible={renderMenu}
                                render={contentMenu}
                                onClickOutside={() => setRenderMenu(false)}
                                placement="bottom-end"
                            >
                                <div className={cx('avarta-with-logo')} onClick={() => setRenderMenu(true)}>
                                    <img
                                        className={cx('logo-theme')}
                                        src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
                                        alt=""
                                    ></img>
                                    {userInfo?.avatar ? (
                                        <img className={cx('avarta')} src={userInfo?.avatar} alt="" />
                                    ) : (
                                        <div
                                            className={cx('avarta-custom')}
                                            style={{ backgroundColor: backgroundColor }}
                                        >
                                            {firstLetterLastName}
                                        </div>
                                    )}
                                </div>
                            </Tippy>
                        </div>
                    ) : (
                        <Button href={'/login'} primary small>
                            Log in
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
