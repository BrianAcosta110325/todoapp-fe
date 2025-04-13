export interface Todo {
    id?: number;
    text: string;
    priority: string;
    dueDate: string;
    completed?: boolean;
    dueDateProximity: number;
}