import { MediaBluetoothOnOutlined } from "@mui/icons-material";
import { TodoList } from "@prisma/client";
import { filterValuesType } from "../../components/Content";
import { api } from "./api";

export type todosApiType = TodoList & { filter: filterValuesType }

export const todosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTodos: builder.query<todosApiType[], void>({
            query: () => ({
                url: `/todos`,
                method: 'GET',
            }),
            providesTags: result => ['Todo']
        }),
        getOneTodo: builder.query<todosApiType, string>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'GET',
                params: {
                    id
                }
            })
        }),
        editTodo: builder.mutation<string, todosApiType>({
            query: (todo) => ({
                url: `/todos/edit/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        removeTodo: builder.mutation<string, string>({
            query: ( id ) => ({
                url: `/todos/remove/${id}`,
                method: 'POST',
                body: { id }
            }),
            invalidatesTags: ['Todo']
        }),
        addTodo: builder.mutation<todosApiType, todosApiType>({
            query: (todosApiType) => ({
                url: `/todos/add`,
                method: 'POST',
                body: todosApiType
            }),
            invalidatesTags: ['Todo']
        }),

    })
})

export const {
    useAddTodoMutation,
    useEditTodoMutation,
    useGetAllTodosQuery,
    useRemoveTodoMutation,
    useGetOneTodoQuery
} = todosApi;

export const {
    addTodo,
    editTodo,
    removeTodo,
    getAllTodos,
    getOneTodo
} = todosApi.endpoints;