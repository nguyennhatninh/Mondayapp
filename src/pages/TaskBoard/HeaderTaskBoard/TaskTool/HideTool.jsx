import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './TaskTool.module.scss';
import { editHideTool } from '~/redux/actions';

const cx = classNames.bind(styles);

function HideTool({ indexTB, toolItems, handleCheckHide }) {
    const [checkboxes, setCheckboxes] = useState(
        JSON.parse(localStorage.getItem(`toolHide${indexTB}`)) || [true, true, true],
    );
    const [checkedAll, setCheckedAll] = useState(checkboxes.includes(false) ? false : true);

    const iconsHide = [faCalendar, faCircleUser, faListCheck];

    const dispatch = useDispatch();

    useEffect(() => {
        handleEditHideTool(checkboxes);
        handleCheckHide(checkboxes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkboxes]);

    const handleEditHideTool = (checkboxes) => {
        dispatch(
            editHideTool({
                index: indexTB,
                hideToolValue: checkboxes,
            }),
        );
    };
    return (
        <div className={cx('tool-hide')}>
            <div>Choose column to display</div>
            <div className={cx('tool-hide-item')}>
                All columns
                <input
                    type="checkbox"
                    checked={checkedAll}
                    onChange={() => {
                        setCheckedAll(!checkedAll);
                        setCheckboxes([!checkedAll, !checkedAll, !checkedAll]);
                        localStorage.setItem(
                            `toolHide${indexTB}`,
                            JSON.stringify([!checkedAll, !checkedAll, !checkedAll]),
                        );
                        handleEditHideTool([!checkedAll, !checkedAll, !checkedAll]);
                    }}
                />
            </div>
            {toolItems.labels.map((label, index) => (
                <div className={cx('tool-hide-item')} key={index}>
                    <div>
                        <FontAwesomeIcon icon={iconsHide[index]} />
                        {label}
                    </div>
                    <input
                        type="checkbox"
                        checked={checkboxes[index]}
                        onChange={() => {
                            const newCheckboxes = [...checkboxes];
                            newCheckboxes[index] = !checkboxes[index];
                            setCheckboxes(newCheckboxes);
                            localStorage.setItem(`toolHide${indexTB}`, JSON.stringify(newCheckboxes));
                            if (newCheckboxes[index] === false) {
                                setCheckedAll(false);
                            } else if (!newCheckboxes.includes(false)) {
                                setCheckedAll(true);
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default HideTool;
