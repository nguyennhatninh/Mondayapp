import { DefaultLayouts, RegisterLayout } from '~/layouts';
import config from '~/config';
import Home from '~/pages/Home';
import MyWorkPage from '~/pages/MyWorkPage';
import LoginPage from '~/pages/AuthPage/login';
import SignupPage from '~/pages/AuthPage/signup';
import ForgotPasswordPage from '~/pages/AuthPage/forgotPassword';
import ResetPassword from '~/pages/AuthPage/resetPassword';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: LoginPage, layout: RegisterLayout },
    { path: config.routes.signup, component: SignupPage, layout: RegisterLayout },
    { path: config.routes.myWorkPage, component: MyWorkPage, layout: DefaultLayouts },
    { path: config.routes.forgotPassword, component: ForgotPasswordPage, layout: RegisterLayout },
    { path: config.routes.resetPassword, component: ResetPassword, layout: RegisterLayout },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
