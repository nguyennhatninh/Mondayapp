/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

function Search({ iconLeft, iconRight, iconCustom, placeholder, contentIcon, lite, handleSetInputValue, hover }) {
    const [searchLite, setSearchLite] = useState(!!lite);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        handleSetInputValue(debouncedValue);
    }, [debouncedValue]);

    return (
        <div
            className={cx('search', { searchLite })}
            onClick={() => {
                setSearchLite(false);
                inputRef.current.focus();
            }}
            onBlur={() => lite && setSearchLite(true)}
        >
            {iconLeft && <img className={cx('search-icon')} src={iconLeft} alt="" />}
            <input
                ref={inputRef}
                className={cx('search-input')}
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value.trim())}
            ></input>
            <Tippy content="Clear Search">
                <div>
                    <FontAwesomeIcon className={cx('search-icon-clear')} icon={faXmark} />
                </div>
            </Tippy>
            {iconRight && <img className={cx('search-icon', { hover })} src={iconRight} alt="" />}
            <Tippy content={contentIcon}>
                {iconCustom && <img className={cx('search-icon-custom')} src={iconCustom} alt="" />}
            </Tippy>
        </div>
    );
}

export default Search;
