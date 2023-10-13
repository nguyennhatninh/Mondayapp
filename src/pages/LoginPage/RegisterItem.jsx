import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function RegisterItem({ signup, name, itemref, min, check, validatorRules, error, handleOnChange }) {
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const inputValue = itemref.current.value;
        if (check && signup) {
            name === 'fullname' && !validatorRules.required(inputValue) && setErrorMessage('Please fill Fullname');
            name === 'email' && !validatorRules.required(inputValue) && setErrorMessage('Please fill Email');
            name === 'password' && !validatorRules.required(inputValue) && setErrorMessage('Please fill Password');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [check]);

    const onBlur = (e) => {
        const inputValue = itemref.current.value;
        e.preventDefault();
        if (signup) {
            if (name === 'fullname') {
                !validatorRules.required(inputValue) && setErrorMessage('Please fill Fullname');
            }
            if (name === 'email') {
                !validatorRules.required(inputValue)
                    ? setErrorMessage('Please fill Email')
                    : !validatorRules.email(inputValue) && setErrorMessage('Please enter a valid email');
            }
            if (name === 'password') {
                !validatorRules.required(inputValue)
                    ? setErrorMessage('Please fill Password')
                    : !validatorRules.password(inputValue) &&
                      setErrorMessage(`Please enter at least ${min} characters`);
            }
        }
    };
    const onChange = (e) => {
        const inputValue = itemref.current.value;
        e.preventDefault();
        if (signup) {
            validatorRules.required(inputValue)
                ? setErrorMessage('')
                : setErrorMessage(`Please fill ${name.charAt(0).toUpperCase() + name.slice(1)} `);
        } else {
            handleOnChange();
        }
    };

    return (
        <div>
            <div className={cx('register-content-item')}>
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                <input
                    className={cx('register-content-input', (errorMessage !== '' || error) && 'error-message')}
                    onBlur={onBlur}
                    onChange={onChange}
                    ref={itemref}
                    name={name}
                    type={name === 'password' ? 'password' : 'text'}
                />
            </div>
            <div className={cx('register-content-error')}>{errorMessage}</div>
        </div>
    );
}

export default RegisterItem;
