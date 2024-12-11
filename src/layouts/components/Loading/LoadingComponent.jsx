import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { PuffLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function LoadingComponent(loading) {
    return (
        <div>
            {loading && (
                <div className={cx('overlay', { loading })}>
                    <PuffLoader color="#fafafa" size={80} />
                </div>
            )}
        </div>
    );
}

export default LoadingComponent;
