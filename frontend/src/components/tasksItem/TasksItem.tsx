import './TasksItem.scss';
import { useState } from 'react';
import { TasksAdd } from '../tasksAdd';
import { EditButton } from '../editButton';
import { DeleteButton } from '../deleteButton';
import { CheckButton } from '../checkButton/CheckButton';
import { store } from '../../store/store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TasksInterface } from '../../store/types';

interface ITasksItem {
    task: TasksInterface,
    isBeingDragged?: boolean,
    isASubtask?: boolean
}

export const TasksItem = ({ task, isBeingDragged = false, isASubtask = false }: ITasksItem) => {
    const [isCompletedAnimationRunning, setIsCompletedAnimationRunning] = useState(false)
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [taskName, setTaskName] = useState(task?.name)

    const {
        attributes,
        listeners,
        setNodeRef: setDraggableNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task?.id, disabled: isASubtask })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const checkTaskHandler = () => {
        store.dispatch({ type: 'board/taskCompleted', payload: { completedId: task?.id } })

        if (task.isCompleted) {
            setIsCompletedAnimationRunning(false)
        } else {
            setIsCompletedAnimationRunning(true)
        }
    }

    const deleteTaskHandler = () => {
        store.dispatch({ type: 'board/taskDeleted', payload: { deletedId: task?.id } })
    }

    const editTaskHandler = () => {
        if (isBeingEdited) {
            store.dispatch({ type: 'board/taskEdited', payload: { editedTask: { ...task, name: taskName } } })
            setIsBeingEdited(false)
        } else {
            setIsBeingEdited(true)
        }
    }

    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            editTaskHandler()
        }
    }

    const editTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value)
    }

    return (
        <div ref={setDraggableNodeRef} className={`tasks-item-wrapper ${isBeingDragged ? 'task-being-dragged' : ''}`} style={style} {...listeners} {...attributes}>
            <div className={`tasks-item-area ${task?.isCompleted ? 'task-completed' : ''} ${isCompletedAnimationRunning ? 'task-completed-animation' : ''}`}>
                <div className='tasks-item-wrap'>
                    <CheckButton onClickHandler={checkTaskHandler} />
                    {isBeingEdited ? <input type='text' value={taskName} onChange={editTaskName} onKeyUp={keyPressHandler} /> : <p>{task?.name}</p>}
                </div>
                <div className='tasks-item-options'>
                    <EditButton onClickHandler={editTaskHandler} isBeingEdited={isBeingEdited} />
                    <DeleteButton onClickHandler={deleteTaskHandler} />
                </div>
            </div>
            <div className='tasks-item-subtasks'>
                {task?.subtasks?.map((task) => (
                    <TasksItem isBeingDragged={isDragging || isBeingDragged} key={task.id} task={task} isASubtask={true} />
                ))}

                {!isDragging && !isBeingDragged && (
                    <TasksAdd where={{ isParentAColumn: false, parentId: task?.id }} />
                )}
            </div>
        </div>
    );
}
