import { QueryParams } from "../Interfaces/QueryParams"
import { Todo } from "../Interfaces/Todo"
import { Api } from "./Api"

export const TodoService = {
    getTodos: async (params?: QueryParams) => {
        return Api.get(`todos`, params)
    },

    addTodo: async (todo: Todo) => {
        return Api.post(`todos`, todo)
    },

    updateTodo: async (todo: Todo) => {
        return Api.put(`todos/${todo.id}`, todo)
    },

    setAsDone: async (id: number) => {
        return Api.post(`todos/${id}/done`)
    },

    setAsUndone: async (id: number) => {
        return Api.put(`todos/${id}/undone`)
    },

    deleteTodo: async (id: number) => {
        return Api.delete(`todos/${id}`)
    },
}