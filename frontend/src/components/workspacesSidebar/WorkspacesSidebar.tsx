import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';
import { SidebarButton } from '../sidebarButton/SidebarButton';
import { Boards, Home, Profile, Search } from '../../assets/icons';

export const WorkspacesSidebar = () => {
    return (
        <div className='workspaces'>
            <div className="workspaces-main">
                <SidebarButton text='Dashboard' onClickHandler={() => { }}>
                    <Home />
                </SidebarButton>
                <SidebarButton text='Boards' isChecked onClickHandler={() => { }}>
                    <Boards />
                </SidebarButton>
                <SidebarButton text='Profile' onClickHandler={() => { }}>
                    <Profile />
                </SidebarButton>
                <SidebarButton text='Search' onClickHandler={() => { }}>
                    <Search />
                </SidebarButton>
            </div>
            <div className="workspaces-footer">
                <UserProfile />
                <WorkspaceSettings />
            </div>
        </div>
    )
}
