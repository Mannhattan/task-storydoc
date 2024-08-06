import { TasksAdd } from '../tasksAdd';
import './TasksColumn.scss';

import { useDroppable } from '@dnd-kit/core';

interface ITasksColumn {
    id: string,
    name: string,
    children: React.ReactNode
}

export const TasksColumn = ({ id = '', name = '', children }: ITasksColumn) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    const style = {
        borderColor: isOver ? '#49A2FC' : "#ECF1FD",
    };

    return (
        <div className='tasks-column' style={style} ref={setNodeRef}>
            <p>{name}</p>

            <div className='tasks-column-items'>
                {children}
                <TasksAdd where={{ isParentAColumn: true, parentId: id }} />
            </div>
        </div>
    )
}
