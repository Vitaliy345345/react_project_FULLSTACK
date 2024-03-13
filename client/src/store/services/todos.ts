import { TodoList } from "@prisma/client";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query<TodoList[], void>({
            query: () => ({
                url: '/todos',
                method: 'GET'
            })
        })
    })
})