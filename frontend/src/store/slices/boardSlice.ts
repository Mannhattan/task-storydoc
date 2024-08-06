import { createSlice } from "@reduxjs/toolkit";
import { BoardInterface, TasksInterface } from "../types";
import initialTasks from '../initialTasks.json'

const initialState: BoardInterface | Record<string, never> = {
    tasks: initialTasks,
};

function getSubtasksToRemove(tasks: Array<TasksInterface>, parentId: number) {
    const toRemove = new Set([parentId]);
    tasks.forEach(task => {
        if (task.parent === parentId) {
            toRemove.add(task.id);
            getSubtasksToRemove(tasks, task.id).forEach(subId => toRemove.add(subId));
        }
    });
    return toRemove;
}

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        taskAdded(state, action) {
            const foundHighestId = state.tasks.reduce(
                (maxId, currentTask) => currentTask.id > maxId ? (maxId = currentTask.id) : maxId,
                1,
            );

            if (action.payload.isParentAColumn) {
                const foundLastTaskPosition = state.tasks.reduce(
                    (maxPosition, currentTask) => currentTask.position > maxPosition ? (maxPosition = currentTask.position) : maxPosition,
                    1,
                );

                return {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        {
                            id: foundHighestId + 1,
                            position: foundLastTaskPosition + 1,
                            column: action.payload.parentId,
                            name: action.payload.name,
                            isCompleted: false,
                        }
                    ]
                }
            } else {
                const foundLastSiblingTaskPosition = state.tasks.reduce(
                    (maxPosition, currentTask) => (currentTask.parent === action.payload.parentId) && currentTask.position > maxPosition ? (maxPosition = currentTask.position) : maxPosition,
                    1,
                );

                return {
                    ...state,
                    tasks: [
                        ...state.tasks,
                        {
                            id: foundHighestId + 1,
                            position: foundLastSiblingTaskPosition + 1,
                            name: action.payload.name,
                            isCompleted: false,
                            parent: action.payload.parentId
                        }
                    ]
                }
            }
        },
        taskEdited(state, action) {
            return {
                ...state,
                tasks: [
                    ...state.tasks.filter(task => task.id !== action.payload.editedTask.id),
                    action.payload.editedTask
                ]
            }
        },
        taskMovedToOtherColumn(state, action) {
            const activeTask = state.tasks.find((item) => item.id === action.payload.activeTaskId);
            const foundLastTaskPosition = state.tasks.reduce(
                (maxPosition, currentTask) => currentTask.position > maxPosition ? (maxPosition = currentTask.position) : maxPosition,
                1,
            );
            if (activeTask) {
                activeTask.column = action.payload.overColumnId
                activeTask.position = foundLastTaskPosition + 1
            }
        },
        taskMoved(state, action) {
            const activeTask = state.tasks.find((item) => item.id === action.payload.activeTaskId);
            const overTask = state.tasks.find((item) => item.id === action.payload.overTaskId);
            if (activeTask && overTask) {
                [activeTask.position, overTask.position] = [overTask?.position, activeTask?.position];
            }
        },
        taskCompleted(state, action) {
            const task = state.tasks.find(task => task.id === action.payload.completedId)
            if (task) {
                task.isCompleted = !task.isCompleted
            }
        },
        taskDeleted(state, action) {
            const subtasksToRemove = getSubtasksToRemove(state.tasks, action.payload.deletedId);
            const filteredTasks = state.tasks.filter(task => !subtasksToRemove.has(task.id));
            return {
                ...state,
                tasks: filteredTasks
            }
        },
    },
})

export const { } = boardSlice.actions;
