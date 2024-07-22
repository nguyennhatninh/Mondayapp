import classNames from 'classnames/bind';

import styles from './RegisterLayout.module.scss';
import Require from '../Auth/Require';
import { useSelector } from 'react-redux';
import { requireSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);
function OtherLayout({ children }) {
    const require = useSelector(requireSelector);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-login')}>
                <img
                    className={cx('header-login-logo')}
                    src="https://cdn.monday.com/images/logos/monday_logo_short.png"
                    alt=""
                ></img>
            </div>
            {children}
            <Require show={require.status} description={require.description} button={require.button} />
        </div>
    );
}
export default OtherLayout;
