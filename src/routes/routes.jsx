import { DefaultLayouts, RegisterLayout } from '~/layouts';
import config from '~/config';
import Home from '~/pages/Home';
import MyWorkPage from '~/pages/MyWorkPage';
import LoginPage from '~/pages/AuthPage/login';
import SignupPage from '~/pages/AuthPage/signup';

// Public Routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: LoginPage, layout: RegisterLayout },
    { path: config.routes.signup, component: SignupPage, layout: RegisterLayout },
    { path: config.routes.myWorkPage, component: MyWorkPage, layout: DefaultLayouts },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
