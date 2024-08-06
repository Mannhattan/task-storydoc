export interface TasksInterface {
    id: number,
    position: number,
    name: string,
    isCompleted: boolean,
    column?: string | null,
    parent?: string | number | null,
    subtasks?: Array<TasksInterface>
}

export interface BoardInterface {
    tasks: Array<TasksInterface>,
}
