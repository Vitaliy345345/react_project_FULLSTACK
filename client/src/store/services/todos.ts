import { TodoList, User } from "@prisma/client";
import { filterValuesType } from "../../components/Content";
import { api } from "./api";

type todosApiType = TodoList & { filter: filterValuesType }

export const todosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query<todosApiType[], void>({
            query: (user) => ({
                url: `/todos`,
                method: 'GET',
            })
        }),
        editTodo: builder.mutation<string, todosApiType>({
            query: (todo) => ({
                url: `/todos/edit/${todo.id}`,
                method: 'PUT'
            })
        }),
        removeTodo: builder.mutation<string, string>({
            query: (id) => ({
                url: `/todos/remove/${id}`,
                method: 'POST',
                body: { id }
            })
        }),
        addTodo: builder.mutation<todosApiType, todosApiType>({
            query: (todo) => ({
                url: `/todos/add`,
                method: 'POST',
                body: { todo }
            })
        }),

    })
})

export const {
    useAddTodoMutation,
    useEditTodoMutation,
    useGetAllTodosQuery,
    useRemoveTodoMutation
} = todosApi;

export const {
    addTodo,
    editTodo,
    removeTodo,
    getAllTodos
} = todosApi.endpoints;