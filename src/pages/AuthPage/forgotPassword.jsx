import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import Button from '~/components/Button';
import { useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { requireOther } from '~/redux/actions';

const cx = classNames.bind(styles);

function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const inputref = useRef();
    const handleSendLink = async (email) => {
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/auth/forgot-password`, { email });
        if (res.status === 200) {
            dispatch(
                requireOther({
                    name: 'checkMail',
                    description: 'Reset link sent to your email. Please, check your email to reset password',
                    status: true,
                    button: 'Next',
                }),
            );
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const email = inputref.current.value;
        handleSendLink(email);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('forgot-password-body')}>
                <div className={cx('forgot-password-container')}>
                    <h1 className={cx('forgot-password-title')}>
                        <b>Forgot </b>Password
                    </h1>
                    <h3>We'll email you instructions on how to reset your password</h3>
                    <form onSubmit={onSubmit} className={cx('forgot-password-form')}>
                        <input
                            ref={inputref}
                            className={cx('forgot-password-content-input')}
                            type="text"
                            placeholder="Example@company.com"
                        ></input>
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

export default ForgotPasswordPage;
