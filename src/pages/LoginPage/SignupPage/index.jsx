import classNames from 'classnames/bind';

import styles from '../LoginPage.module.scss';
import Button from '~/components/Button/Button';
import RegisterSupport from '~/pages/LoginPage/RegisterSupport';
import RegisterForm from '~/pages/LoginPage/RegisterForm';

const cx = classNames.bind(styles);

function SignupPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-body')}>
                <div className={cx('login-container')}>
                    <h1 className={cx('login-title')}>
                        <b>Sign </b>Up
                    </h1>
                    <RegisterForm signup></RegisterForm>
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
                    <RegisterSupport>By proceeding, you agree to the</RegisterSupport>
                    <RegisterSupport link="Privacy Policy." otherLink="Terms of Service" href="./">
                        and
                    </RegisterSupport>
                    <div style={{ height: 30 }}></div>
                    <RegisterSupport link="Login" href="./login">
                        Already have an account?
                    </RegisterSupport>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
