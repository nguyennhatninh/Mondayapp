import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { useSelector } from 'react-redux';
import { taskBoardsSelector } from './redux/selectors';
import TaskBoard from './pages/TaskBoard';
import { createContext } from 'react';

export const IndexContext = createContext();

function App() {
    const taskBoards = useSelector(taskBoardsSelector);
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
                    {taskBoards.map((item, index) => {
                        return (
                            <Route
                                key={item.id}
                                path={item.config}
                                element={
                                    <DefaultLayout>
                                        <IndexContext.Provider value={index}>
                                            <TaskBoard
                                                indexTB={index}
                                                key={index}
                                                title={item.name}
                                                main={index === 0}
                                            />
                                        </IndexContext.Provider>
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
