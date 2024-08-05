import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { requireOther } from '~/redux/actions';
import axiosInstance from '~/axiosConfig';

const cx = classNames.bind(styles);

function ResetPassword() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const handleResetPassword = async (newPassword) => {
        const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
            password: newPassword,
        });
        if (res.status === 200) {
            dispatch(
                requireOther({
                    name: 'resetPassword',
                    description: 'Successfully, you can login with your new password',
                    status: true,
                    button: 'Close',
                }),
            );
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        console.log(password, confirmPassword);
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
        } else {
            password === confirmPassword
                ? handleResetPassword(password)
                : setErrorMessage('Confirm password not matches');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('reset-password-body')}>
                <div className={cx('reset-password-container')}>
                    <h1 className={cx('reset-password-title')}>
                        <b>Reset </b>Password
                    </h1>
                    <h3>We'll email you instructions on how to reset your password</h3>
                    <form onSubmit={onSubmit} className={cx('reset-password-form')}>
                        <input
                            ref={passwordRef}
                            className={cx('reset-password-content-input')}
                            type="password"
                            placeholder="New Password"
                        ></input>
                        <input
                            ref={confirmPasswordRef}
                            className={cx('reset-password-content-input')}
                            type="password"
                            placeholder="Confirm New Password"
                        ></input>
                        <div className={cx('register-content-error')}>{errorMessage}</div>
                        <div>
                            <Button className={cx('register-btn')} primary>
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
