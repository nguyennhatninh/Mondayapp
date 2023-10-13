import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import RegisterForm from './RegisterForm';
import Button from '~/components/Button/Button';
import RegisterSupport from './RegisterSupport';

const cx = classNames.bind(styles);

function LoginPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-body')}>
                <div className={cx('login-container')}>
                    <h1 className={cx('login-title')}>
                        <b>Log </b>In
                    </h1>
                    <RegisterForm login></RegisterForm>
                    <div className={cx('login-separator')}>
                        <span className={cx('separator-line')}></span>
                        <div>Or Sign in with </div>
                        <span className={cx('separator-line')}></span>
                    </div>
                    <div className={cx('other-login-btn')}>
                        <Button
                            leftIcon={<img src="https://cdn.monday.com/images/logo_google_v2.svg" alt=""></img>}
                            outline
                        >
                            Google
                        </Button>
                    </div>
                    <RegisterSupport link=" Sign up " href="./signup">
                        Don't have an account yet?
                    </RegisterSupport>
                    <RegisterSupport link="Visit our help center" href="./">
                        Can't log in?
                    </RegisterSupport>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
