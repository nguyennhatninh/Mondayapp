import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import styles from './LoginPage.module.scss';
import RegisterItem from './RegisterItem';
import Button from '~/components/Button/Button';
import axiosInstance from '~/axiosConfig';

const cx = classNames.bind(styles);

function RegisterForm({ logIn, signup }) {
    const [checkValue, setcheckValue] = useState(false);
    const [errorMessageLogin, setErrorMessageLogin] = useState('');

    const fullnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const items = [
        { ref: fullnameRef, name: 'fullname' },
        { ref: emailRef, name: 'email' },
        { ref: passwordRef, name: 'password' },
    ];

    const validatorRules = {
        required: function (value) {
            return value.trim() ? true : false;
        },
        email: function (value) {
            var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? true : false;
        },
        password: function (value) {
            return value?.length >= 8 ? true : false;
        },
    };
    const handleRegister = async (userInfo) => {
        const res = await axiosInstance.post(`/user/register`, userInfo);
        typeof res.data.data === 'string' && setErrorMessageLogin(res.data.data);
        if (res.status === 200) {
            window.location.href = './login';
        }
    };
    const handleLogin = async (userInfo) => {
        try {
            const res = await axiosInstance.post(`/auth/login`, userInfo);
            const dataLoginRes = res.data;
            localStorage.setItem('accessToken', dataLoginRes.accessToken);
            localStorage.setItem('refreshToken', dataLoginRes.refreshToken);
            window.location.href = './';
        } catch (err) {
            setErrorMessageLogin(err.response.data.data);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setcheckValue(true);
        if (
            signup &&
            validatorRules.required(fullnameRef.current.value) &&
            validatorRules.email(emailRef.current.value) &&
            validatorRules.password(passwordRef.current.value)
        ) {
            handleRegister({
                name: fullnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
        }
        if (
            logIn &&
            validatorRules.required(passwordRef.current.value) &&
            validatorRules.email(emailRef.current.value)
        ) {
            handleLogin({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
        }
    };

    const handleOnChange = () => {
        setErrorMessageLogin('');
    };

    return (
        <form className={cx('register-form')} onSubmit={onSubmit}>
            {logIn && (
                <div>
                    {errorMessageLogin && <div className={cx('register-content-error')}>{errorMessageLogin}</div>}
                    {items.slice(1).map((item, index) => (
                        <RegisterItem
                            login
                            key={index}
                            itemref={item.ref}
                            name={item.name}
                            check={checkValue}
                            error={errorMessageLogin !== ''}
                            validatorRules={validatorRules}
                            handleOnChange={handleOnChange}
                        />
                    ))}
                    <a className={cx('forgot-password')} href="/forgotPassword">
                        Forgot your password ?
                    </a>
                    <Button className={cx('register-btn')} primary>
                        Login
                    </Button>
                </div>
            )}
            {signup && (
                <div>
                    {errorMessageLogin && <div className={cx('register-content-error')}>{errorMessageLogin}</div>}
                    {items.map((item, index) => (
                        <RegisterItem
                            signup
                            key={index}
                            itemref={item.ref}
                            name={item.name}
                            check={checkValue}
                            validatorRules={validatorRules}
                            min={8}
                        />
                    ))}
                    <Button className={cx('register-btn')} primary>
                        Continue
                    </Button>
                </div>
            )}
        </form>
    );
}

export default RegisterForm;
