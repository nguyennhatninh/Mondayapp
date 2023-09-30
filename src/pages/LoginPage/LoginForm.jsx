import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import LoginContentItem from './LoginContentItem';
import Button from '~/components/Button/Button';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function LoginForm({ login, signup }) {
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

    const [checkValue, setcheckValue] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setcheckValue(true);
        if (
            validatorRules.required(fullnameRef.current.value) &&
            validatorRules.email(emailRef.current.value) &&
            validatorRules.password(passwordRef.current.value)
        ) {
            console.log({
                fullname: fullnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
        }
    };
    return (
        <form className={cx('login-form')} onSubmit={onSubmit}>
            {login && (
                <div>
                    <LoginContentItem itemref={emailRef} name={'email'} />
                    <LoginContentItem itemref={passwordRef} name={'password'} />
                    <div className={cx('forgot-password')}>Forgot your password ?</div>
                    <Button className={cx('login-btn')} primary>
                        Login
                    </Button>
                </div>
            )}
            {signup && (
                <div>
                    {items.map((item, index) => (
                        <LoginContentItem
                            key={index}
                            index={index}
                            itemref={item.ref}
                            name={item.name}
                            check={checkValue}
                            validatorRules={validatorRules}
                            min={8}
                        />
                    ))}
                    <Button className={cx('login-btn')} primary>
                        Continue
                    </Button>
                </div>
            )}
        </form>
    );
}

export default LoginForm;
