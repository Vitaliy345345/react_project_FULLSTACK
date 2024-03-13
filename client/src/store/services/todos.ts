import { TodoList } from "@prisma/client";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query<TodoList[], void>({
            query: () => ({
                url: '/todos',
                method: 'GET'
            })
        }),
        editTodo: builder.mutation<string, TodoList>({
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
        addTodo: builder.mutation<TodoList, TodoList>({
            query: (todo) => ({
                url: `/todos/add`,
                method: 'POST',
                body: {todo}
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