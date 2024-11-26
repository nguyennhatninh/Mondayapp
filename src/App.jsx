import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import TaskBoard from './pages/TaskBoard';
import { createContext } from 'react';
import axiosInstance from './axiosConfig';

export const TaskBoardValue = createContext();

function App() {
    const isLogin = !!localStorage.getItem('accessToken');
    const [myTaskBoards, setTaskBoard] = useState([{ name: 'New Workspace' }]);
    const getAllTaskBoards = async () => {
        const taskBoards = await axiosInstance.get('/user/my_workspaces');
        setTaskBoard(taskBoards.data);
    };
    useEffect(() => {
        if (isLogin) {
            getAllTaskBoards();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {myTaskBoards.map((item, index) => {
                        return (
                            <Route
                                key={index}
                                path={`/TaskBoard/${item._id}`}
                                element={
                                    <DefaultLayout>
                                        <TaskBoardValue.Provider value={[item, getAllTaskBoards]}>
                                            <TaskBoard key={index} taskBoard={item} />
                                        </TaskBoardValue.Provider>
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
