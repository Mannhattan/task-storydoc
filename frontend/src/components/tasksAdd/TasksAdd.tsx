import { useState } from 'react';
import { Add } from '../../assets/icons';
import { store } from '../../store/store';
import './TasksAdd.scss';
import { CheckButton } from '../checkButton';
import { DeleteButton } from '../deleteButton';

interface ITasksAdd {
    where: {
        isParentAColumn: boolean,
        parentId?: string | number
    }
}

export const TasksAdd = ({ where }: ITasksAdd) => {
    const [isBeingAdded, setIsBeingAdded] = useState(false)
    const [taskName, setTaskName] = useState("")

    const editTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value)
    }

    const addTaskHandler = () => {
        setIsBeingAdded(true)
    }

    const cancelTaskHandler = () => {
        setTaskName("")
        setIsBeingAdded(false)
    }

    const confirmTaskHandler = () => {
        store.dispatch({
            type: 'board/taskAdded',
            payload: {
                isParentAColumn: where.isParentAColumn,
                parentId: where.parentId,
                name: taskName,
            }
        })

        setTaskName("")
        setIsBeingAdded(false)
    }

    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            confirmTaskHandler()
        }
    }

    return (
        <>
            {isBeingAdded ? (
                <div className='tasks-add-editing'>
                    <input type='text' value={taskName} onChange={editTaskName} onKeyUp={keyPressHandler} />
                    <div className='tasks-add-editing-options'>
                        <CheckButton onClickHandler={confirmTaskHandler} />
                        <DeleteButton onClickHandler={cancelTaskHandler} />
                    </div>
                </div>
            ) : (
                <button className='tasks-add' onClick={addTaskHandler}>
                    <Add />
                    <p>Add a card</p>
                </button>
            )}
        </>
    )
}
