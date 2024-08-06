import './App.scss';
import { TasksWrapper } from './components/tasksWrapper';
import { WorkspacesSidebar } from "./components/workspacesSidebar"

export const App = () => {
    return (
        <div className="container">
            <WorkspacesSidebar />
            <TasksWrapper />
        </div>
    )
}