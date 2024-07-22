import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayouts.module.scss';
import Require from '../Auth/Require';
import { useSelector } from 'react-redux';
import { requireSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const require = useSelector(requireSelector);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div style={{ height: 'var(--header-height)' }}></div>
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <Require show={require.status} description={require.description} button={require.button} />
        </div>
    );
}

export default DefaultLayout;
