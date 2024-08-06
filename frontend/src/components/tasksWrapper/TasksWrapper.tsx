import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { TasksColumn } from '../tasksColumn';
import './TasksWrapper.scss';

import '../tasksItem/TasksItem.scss';

import { TasksItem } from '../tasksItem';
import { store } from '../../store/store';
import { useSelector } from 'react-redux';
import { BoardInterface, TasksInterface } from '../../store/types';
import { useMemo, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


const nestAndSortTasks = (incomingTasks: Array<TasksInterface>) => {
    const tasks: Array<TasksInterface> = JSON.parse(JSON.stringify(incomingTasks))

    const taskMap = new Map();

    tasks.forEach(task => {
        task.subtasks = [];
        taskMap.set(task.id, task);
    });

    const nestedTasks: Array<TasksInterface> = [];

    tasks.forEach(task => {
        if (task.parent) {
            const parentTask = taskMap.get(task.parent);

            if (parentTask) {
                parentTask.subtasks.push(task);
                parentTask.subtasks.sort((a: TasksInterface, b: TasksInterface) => a.position - b.position)
            }
        } else {
            nestedTasks.push(task);
        }
    });

    return nestedTasks.sort((a, b) => a.position - b.position)
}

export const TasksWrapper = () => {
    const [activeId, setActiveId] = useState<string | number | null>(null);

    const tasks = useSelector((state: { board: BoardInterface }) => nestAndSortTasks(state.board.tasks));
    const todoTasks = useMemo(() => tasks.filter(task => task?.column === "TODO"), [tasks])
    const inProgressTasks = useMemo(() => tasks.filter(task => task?.column === "IN_PROGRESS"), [tasks])
    const doneTasks = useMemo(() => tasks.filter(task => task?.column === "DONE"), [tasks])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (["TODO", "IN_PROGRESS", "DONE"].includes((over.id as string))) {
            store.dispatch({ type: 'board/taskMovedToOtherColumn', payload: { activeTaskId: active.id, overColumnId: over.id } })
        } else {
            if (active.id !== over.id) {
                store.dispatch({ type: 'board/taskMoved', payload: { activeTaskId: active.id, overTaskId: over.id } })
            }
        }

        setActiveId(null)
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id);
    }

    return (
        <div className='tasks-wrapper'>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
                <TasksColumn id={'TODO'} name={'Todo'}>
                    <SortableContext items={[...todoTasks]} strategy={verticalListSortingStrategy}>
                        {todoTasks.map((task) => (
                            <TasksItem key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </TasksColumn>
                <TasksColumn id={'IN_PROGRESS'} name={'In progress'}>
                    <SortableContext items={[...inProgressTasks]} strategy={verticalListSortingStrategy}>
                        {inProgressTasks.map((task) => (
                            <TasksItem key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </TasksColumn>
                <TasksColumn id={'DONE'} name={'Done'}>
                    <SortableContext items={[...doneTasks]} strategy={verticalListSortingStrategy}>
                        {doneTasks.map((task) => (
                            <TasksItem key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </TasksColumn>
                <DragOverlay>
                    {activeId ? <TasksItem task={[...tasks].find(t => t.id === activeId) || tasks[0]} isBeingDragged={true} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
