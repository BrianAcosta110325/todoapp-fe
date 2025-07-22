import { Todo } from "../Interfaces/Todo"
import { Api } from "./Api"

export const TodoService = {
    getTodos: async (params?: String) => {
        return Api.get(`todos`, params)
    },

    addTodo: async (todo: Todo) => {
        return Api.post(`todos`, todo)
    },

    updateTodo: async (todo: Todo) => {
        return Api.patch(`todos/${todo.id}`, todo)
    },

    setAsDone: async (id: number) => {
    return Api.patch(`todos/${id}/completed`);
    },

    setAsUndone: async (id: number) => {
    return Api.patch(`todos/${id}/completed`);
    },

    deleteTodo: async (id: number) => {
        return Api.delete(`todos/${id}`)
    },
}