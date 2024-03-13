import { Route, Routes } from 'react-router-dom';
import { Error404 } from './views/Error/404';
import { Home } from './views/Home/Home';
import { Projects } from './views/Panel/Project/Projects';
import { ProjectDetail } from './views/Panel/Project/Informations/ProjectDetail';
import { ProjectRoadmap } from './views/Panel/Project/Informations/Roadmap/ProjectRoadmap';
import { ProjectMember } from './views/Panel/Project/Informations/Member/ProjectMember';
import { ProjectKanban } from './views/Panel/Project/Informations/Kanban/ProjectKanban';
import { ProjectIssues } from './views/Panel/Project/Informations/Issues/ProjectIssues';
import { ProjectConfig } from './views/Panel/Project/Informations/Config/ProjectConfig';
import { Teams } from './views/Panel/Team/Team';
import { TeamMembers } from './views/Panel/Team/Members/TeamMembers';
import { TeamConfig } from './views/Panel/Team/Config/TeamConfig';
import { Todolist } from './views/Panel/Todolist/Todolist';
import { TodolistDetail } from './views/Panel/Todolist/Detail/TodolistDetail';

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={<Home />}
            />
            <Routes location='/panel'>
                <Routes location='/projects'>
                    <Route
                        path='/'
                        element={<Projects />}
                    />
                    <Routes location='/detail'>
                        <Routes location='/:id'>
                            <Route
                                path='/'
                                element={<ProjectDetail />}
                            />
                            <Route
                                path='/roadmap'
                                element={<ProjectRoadmap />}
                            />
                            <Route
                                path='/member'
                                element={<ProjectMember />}
                            />
                            <Route
                                path='/kanban'
                                element={<ProjectKanban />}
                            />
                            <Route
                                path='/issues'
                                element={<ProjectIssues />}
                            />
                            <Route
                                path='/config'
                                element={<ProjectConfig />}
                            />
                            <Route
                                path='*'
                                element={<Error404 />}
                            />
                        </Routes>
                        <Route
                            path='*'
                            element={<Error404 />}
                        />
                    </Routes>
                    <Route
                        path='*'
                        element={<Error404 />}
                    />
                </Routes>
                <Routes location='/teams'>
                    <Route
                        path='/'
                        element={<Teams />}
                    />
                    <Routes location='/detail'>
                        <Routes location='/:id'>
                            <Route
                                path='/members'
                                element={<TeamMembers />}
                            />
                            <Route
                                path='/config'
                                element={<TeamConfig />}
                            />
                            <Route
                                path='*'
                                element={<Error404 />}
                            />
                        </Routes>
                        <Route
                            path='*'
                            element={<Error404 />}
                        />
                    </Routes>
                    <Route
                        path='*'
                        element={<Error404 />}
                    />
                </Routes>
                <Routes location='/todolist'>
                    <Route
                        path='/'
                        element={<Todolist />}
                    />
                    <Routes location='/detail'>
                        <Routes location='/:id'>
                            <Route
                                path='/'
                                element={<TodolistDetail />}
                            />
                            <Route
                                path='*'
                                element={<Error404 />}
                            />
                        </Routes>
                        <Route
                            path='*'
                            element={<Error404 />}
                        />
                    </Routes>
                    <Route
                        path='*'
                        element={<Error404 />}
                    />
                </Routes>
                <Route
                    path='*'
                    element={<Error404 />}
                />
            </Routes>
            <Route
                path='*'
                element={<Error404 />}
            />
        </Routes>
    );
}

export default App;
