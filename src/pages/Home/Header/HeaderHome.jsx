import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import styles from './HeaderHome.module.scss';
import Button from '~/components/Button/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function HeaderHome() {
    const [name, setName] = useState('');
    const access_token = localStorage.getItem('access_token');
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
            const lastName = info?.name.split(' ').splice(-1)[0];
            setName(lastName);
        }
        fetchData();
    }, []);
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
