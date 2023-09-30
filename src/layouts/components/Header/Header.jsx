import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Logo from '~/components/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = false;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header')}>
                    <img className={cx('options-icon')} src={images.optionsIcon} alt="" />
                    <Logo title={'monday'}>work managerment</Logo>
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
                    {currentUser ? (
                        <div className={cx('avarta-with-logo')}>
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
                    ) : (
                        <Button href={'/login'} primary small rightIcon={<FontAwesomeIcon icon={faSignIn} />}>
                            Log in
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
