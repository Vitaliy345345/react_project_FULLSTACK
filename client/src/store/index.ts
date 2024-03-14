import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './todoSlice'
import auth from './authSlice'
import todos from './todosSlice'
import tasks from './tasksSlice'
import { api } from './services/api';
import { listenerMiddleware } from '../middleware/auth';

const store = configureStore({
    reducer: {
        todoLists: todoReducer,
        [api.reducerPath]: api.reducer,
        auth,
        todos,
        tasks
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(api.middleware)
        .prepend(listenerMiddleware.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch