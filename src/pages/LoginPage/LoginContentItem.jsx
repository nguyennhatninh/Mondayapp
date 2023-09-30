import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function LoginContentItem({ name, itemref, min, check, index, validatorRules }) {
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const inputValue = itemref.current.value;
        if (check) {
            if (name === 'fullname' && !validatorRules.required(inputValue)) {
                setErrorMessage('Please fill Fullname');
            }
            if (name === 'email' && !validatorRules.required(inputValue)) {
                setErrorMessage('Please fill Email');
            } else if (name === 'email' && !validatorRules.email(inputValue)) {
                setErrorMessage('Please fill Email valid');
            }
            if (name === 'password' && !validatorRules.required(inputValue)) {
                setErrorMessage('Please fill Password');
            } else if (name === 'password' && !validatorRules.password(inputValue)) {
                setErrorMessage(`Please fill more ${min} characters`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [check]);

    const onBlur = (e) => {
        const inputValue = itemref.current.value;
        e.preventDefault();
        if (name === 'fullname' && !validatorRules.required(inputValue)) {
            setErrorMessage('Please fill Fullname');
        }
        if (name === 'email' && !validatorRules.required(inputValue)) {
            setErrorMessage('Please fill Email');
        } else if (name === 'email' && !validatorRules.email(inputValue)) {
            setErrorMessage('Please enter a valid email');
        }
        if (name === 'password' && !validatorRules.required(inputValue)) {
            setErrorMessage('Please fill Password');
        } else if (name === 'password' && !validatorRules.password(inputValue)) {
            setErrorMessage(`Please enter at least ${min} characters`);
        }
    };
    const onChange = (e) => {
        const inputValue = itemref.current.value;
        e.preventDefault();
        if (validatorRules.required(inputValue)) {
            setErrorMessage('');
        } else {
            setErrorMessage(`Please fill ${name.charAt(0).toUpperCase() + name.slice(1)} `);
        }
    };

    return (
        <div>
            <div className={cx('login-content-item')}>
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                <input
                    className={cx('login-content-input', errorMessage !== '' && 'error-message')}
                    onBlur={onBlur}
                    onChange={onChange}
                    ref={itemref}
                    name={name}
                    type={name === 'password' ? 'password' : 'text'}
                />
            </div>
            <div className={cx('login-content-error')}>{errorMessage}</div>
        </div>
    );
}

export default LoginContentItem;
