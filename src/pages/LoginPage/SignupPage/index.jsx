import classNames from 'classnames/bind';

import styles from '../LoginPage.module.scss';
import Button from '~/components/Button/Button';
import LoginSupport from '~/pages/LoginPage/LoginSupport';
import LoginForm from '~/pages/LoginPage/LoginForm';

const cx = classNames.bind(styles);

function SignupPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-body')}>
                <div className={cx('login-container')}>
                    <h1 className={cx('login-title')}>
                        <b>Sign </b>Up
                    </h1>
                    <LoginForm signup></LoginForm>
                    <div className={cx('login-separator')}>
                        <span className={cx('separator-line')}></span>
                        <div>Or </div>
                        <span className={cx('separator-line')}></span>
                    </div>
                    <div className={cx('other-login-btn')}>
                        <Button
                            leftIcon={<img src="https://cdn.monday.com/images/logo_google_v2.svg" alt=""></img>}
                            outline
                        >
                            Continue with Google
                        </Button>
                    </div>
                    <LoginSupport>By proceeding, you agree to the</LoginSupport>
                    <LoginSupport link="Privacy Policy." otherLink="Terms of Service" href="./">
                        and
                    </LoginSupport>
                    <div style={{ height: 30 }}></div>
                    <LoginSupport link="Login" href="./login">
                        Already have an account?
                    </LoginSupport>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
