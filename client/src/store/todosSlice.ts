import { TodoList } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { todosApi } from "./services/todos";

interface InitialState {
    todos: TodoList[] | null
}

const initialState: InitialState = {
    todos: null
}

const slice = createSlice({
    name: 'Todos',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(todosApi.endpoints.getAllTodos.matchFulfilled, (state, action) => {
                state.todos = action.payload
            })
    }
})

export default slice.reducer;

export const selectTodos = (state: RootState) => state.todos;