import { TaskList } from "@prisma/client";
import { api } from './api'

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TaskList[], void>({
            query: () => ({
                url: '/tasks',
                method: 'GET'
            })
        }),
        addTask: builder.mutation<TaskList, TaskList>({
            query: (task) => ({
                url: '/tasks/add',
                method: 'POST',
                body: { task }
            })
        }),
        editTask: builder.mutation<string, TaskList>({
            query: (task) => ({
                url: `/tasks/edit/${task.id}`,
                method: 'PUT',
            })
        }),
        removeTask: builder.mutation<string, string>({
            query: (id) => ({
                url: `/tasks/remove/${id}`,
                method: 'POST',
                body: { id }
            })
        })
    })
})

export const {
    useAddTaskMutation,
    useEditTaskMutation,
    useGetAllTasksQuery,
    useRemoveTaskMutation
} = tasksApi;

export const {
    addTask,
    getAllTasks,
    editTask,
    removeTask
} = tasksApi.endpoints
