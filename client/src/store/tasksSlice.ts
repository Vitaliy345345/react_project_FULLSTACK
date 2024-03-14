import { TaskList } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { tasksApi } from "./services/tasks";

interface InitialState {
    tasks: TaskList[] | null
}

const initialState: InitialState = {
    tasks: null
}

const slice = createSlice({
    name: 'Tasks',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(tasksApi.endpoints.getAllTasks.matchFulfilled, (state, action) => {
                state.tasks = action.payload
            })
    }
})

export default slice.reducer;

export const selectTasks = (state: RootState) => state.tasks