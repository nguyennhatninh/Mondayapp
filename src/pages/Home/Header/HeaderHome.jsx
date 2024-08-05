import classNames from 'classnames/bind';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import styles from './HeaderHome.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function HeaderHome() {
    const accessToken = localStorage.getItem('accessToken');
    let decoded;
    accessToken && (decoded = jwtDecode(accessToken));
    const name = decoded?.username;
    return (
        <div className={cx('home-header')}>
            <div className={cx('home-header-intro')}>
                {name && (
                    <div className={cx('home-header-content')}>
                        <div>Hi, {name}!</div>
                        <div>Quickly access your recent boards, Inbox and workspaces</div>
                    </div>
                )}
                <img src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg" alt="" />
            </div>
            <div className={cx('home-header-btn')}>
                <div>
                    <FontAwesomeIcon className={cx('home-header-icon')} icon={faComment} />
                    Give feedback
                </div>
                <Button primary>
                    <FontAwesomeIcon className={cx('home-header-icon')} icon={faBolt} />
                    Quick Search
                </Button>
            </div>
        </div>
    );
}

export default HeaderHome;
