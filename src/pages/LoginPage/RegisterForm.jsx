import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './LoginPage.module.scss';
import RegisterItem from './RegisterItem';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function RegisterForm({ login, signup }) {
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem('accounts')) || []);
    const [checkValue, setcheckValue] = useState(false);
    const [errorMessageLogin, setErrorMessageLogin] = useState('');

    const valueEmail = accounts.map((account) => account.email);
    const valuePassword = accounts.map((account) => account.password);

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

    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }, [accounts]);

    const onSubmit = (e) => {
        e.preventDefault();
        setcheckValue(true);
        if (
            signup &&
            validatorRules.required(fullnameRef.current.value) &&
            validatorRules.email(emailRef.current.value) &&
            validatorRules.password(passwordRef.current.value) &&
            accounts?.length > 0 &&
            !valueEmail.includes(emailRef.current.value)
        ) {
            setAccounts((prev) => [
                ...prev,
                {
                    fullname: fullnameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                },
            ]);
            window.location.href = './';
        }
        if (login) {
            if (
                valueEmail.includes(emailRef.current.value) &&
                valuePassword.includes(passwordRef.current.value) &&
                valueEmail.indexOf(emailRef.current.value) !== -1 &&
                accounts[valueEmail.indexOf(emailRef.current.value)].password === passwordRef.current.value
            ) {
                
                window.location.href = './home';
            } else if (passwordRef.current.value === '' || emailRef.current.value === '') {
                setErrorMessageLogin('Please enter email address and a password');
            } else {
                setErrorMessageLogin('The password or email you entered is incorrect.');
            }
        }
    };

    const handleOnChange = () => {
        setErrorMessageLogin('');
    };

    return (
        <form className={cx('register-form')} onSubmit={onSubmit}>
            {login && (
                <div>
                    {errorMessageLogin && <div className={cx('register-content-error')}>{errorMessageLogin}</div>}
                    {items.slice(1).map((item, index) => (
                        <RegisterItem
                            login
                            key={index}
                            itemref={item.ref}
                            name={item.name}
                            error={errorMessageLogin !== ''}
                            handleOnChange={handleOnChange}
                        />
                    ))}
                    <div className={cx('forgot-password')}>Forgot your password ?</div>
                    <Button className={cx('register-btn')} primary>
                        Login
                    </Button>
                </div>
            )}
            {signup && (
                <div>
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
