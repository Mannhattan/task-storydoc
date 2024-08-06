import './SidebarButton.scss';

interface ISidebarButton {
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement>,
    text: string,
    children: React.ReactNode,
    isChecked?: boolean
}

export const SidebarButton = ({ text, onClickHandler, children, isChecked = false }: ISidebarButton) => {
    return (
        <button onClick={onClickHandler} className={`sidebar-button ${isChecked ? 'sidebar-button-checked' : ''}`}>
            {children}
            <p>{text}</p>
        </button>
    )
}
