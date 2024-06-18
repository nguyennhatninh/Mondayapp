import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayouts.module.scss';
import RequireLogin from '../Auth/RequireLogin';
import { useSelector } from 'react-redux';
import { requireLoginSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const showRequireLogin = useSelector(requireLoginSelector);
    console.log(showRequireLogin);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div style={{ height: 'var(--header-height)' }}></div>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <RequireLogin show={showRequireLogin} />
        </div>
    );
}

export default DefaultLayout;
