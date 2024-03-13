import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './todoSlice'
import auth from './authSlice'
import { api } from './services/api';
import { listenerMiddleware } from '../middleware/auth';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        [api.reducerPath]: api.reducer,
        auth,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(api.middleware)
        .prepend(listenerMiddleware.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch