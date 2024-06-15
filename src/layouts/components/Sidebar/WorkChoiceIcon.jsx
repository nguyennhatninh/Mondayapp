import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function WorkChoiceIcon({ icon, children, hover, small }) {
    return (
        <div>
            <div className={cx('workspace-choice', { hover })}>
                <div className={cx('workspace-icon')}>
                    <div className={cx('workspace-logo', { small })}>
                        M
                        <img src={images.homeSolidIcon} alt="" />
                    </div>
                </div>
                <div className={cx('children', { small })}>{children}</div>
                {icon && <img className={cx('workspace-choice-btn')} src={icon} alt="" />}
            </div>
        </div>
    );
}

export default WorkChoiceIcon;
