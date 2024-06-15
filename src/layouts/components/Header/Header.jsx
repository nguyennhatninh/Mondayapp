import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Logo from '~/components/Logo/Logo';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import Menu from './Menu';
import { loginSelector } from '~/redux/selectors';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import Navbar, { NavbarItem } from '../Sidebar/Navbar';
import config from '~/config';

const cx = classNames.bind(styles);

function Header() {
    const [renderMenu, setRenderMenu] = useState(false);
    const [renderSidebar, setRenderSidebar] = useState(false);
    const isLogin = useSelector(loginSelector);

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
    console.log(renderSidebar);
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
                                    <img
                                        className={cx('avarta')}
                                        src="https://files.monday.com/use1/photos/43954248/thumb/43954248-user_photo_initials_2023_05_31_15_01_39.png?1685545299"
                                        alt=""
                                    />
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
