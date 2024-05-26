import classNames from 'classnames/bind';

import styles from './TaskTool.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function PersonTool() {
    const [users, setUsers] = useState([
        'https://files.monday.com/use1/photos/43954248/thumb/43954248-user_photo_initials_2023_05_31_15_01_39.png?1685545299',
        'https://files.monday.com/use1/photos/43954248/thumb/43954248-user_photo_initials_2023_05_31_15_01_39.png?1685545299',
    ]);
    return (
        <div className={cx('tool-person')}>
            <div>Filter this board by person</div>
            <div className={cx('tool-person-description')}>And find item they're working on.</div>
            <div className={cx('avatars')}>
                {users.map((user) => (
                    <img className={cx('avatar')} src={user} alt="" />
                ))}
            </div>
        </div>
    );
}

export default PersonTool;
