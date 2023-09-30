import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function WorkChoiceIcon({ icon, children, hover, large }) {
    return (
        <div>
            <div className={cx('workspace-choice', { hover })}>
                <div className={cx('workspace-icon', { children })}>
                    <span className={cx('workspace-logo', { large })}>
                        M
                        <img src={images.homeSolidIcon} alt="" />
                    </span>
                </div>
                <div className={cx('children', { large })}>{children}</div>
                {icon && <img className={cx('workspace-choice-btn')} src={icon} alt="" />}
            </div>
        </div>
    );
}

export default WorkChoiceIcon;
