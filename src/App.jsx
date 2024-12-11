import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import TaskBoard from './pages/TaskBoard';
import { createContext } from 'react';
import axiosInstance from './axiosConfig';
import LoadingComponent from './layouts/components/Loading/LoadingComponent';

export const TaskBoardValue = createContext();
export const MyTaskBoardValue = createContext();

function App() {
    const isLogin = !!localStorage.getItem('accessToken');
    const [myTaskBoards, setTaskBoard] = useState([]);
    const [loading, setIsLoading] = useState(true);

    const getAllTaskBoards = async () => {
        try {
            const response = await axiosInstance.get('/user/my_workspaces');
            setTaskBoard(response.data);
        } catch (error) {
            console.error('Error fetching task boards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLogin) {
            getAllTaskBoards();
        } else {
            setIsLoading(false);
        }
    }, [isLogin]);

    if (loading) {
        return <div>{loading && <LoadingComponent loading={loading} />}</div>;
    }

    return (
        <Router>
            <MyTaskBoardValue.Provider value={myTaskBoards}>
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
                        {myTaskBoards.map((item, index) => (
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
                        ))}
                    </Routes>
                </div>
            </MyTaskBoardValue.Provider>
        </Router>
    );
}

export default App;
