import React, { useState, useLayoutEffect } from 'react';
import TodoList, { TaskType } from './TodoList';
import { Container, Grid } from '@mui/material';
import ModalWindow from './ModalWindow';
import { ControlPoint } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';
import SnackBarDelete from './SnackBarDelete';
import TodoListFiltering from './TodoListFiltering';
import '../styles/App.css';
import { useAppDispatch, useAppSelector } from '../hook';
import {
    createTodo,
    removeTodo,
    todoChangeFilter,
    todoEditHandler,
    todoChangeTitle,
    todoFilterAll,
    createTaskAction,
    removeTaskAction,
    changeTaskTitleAction,
    changeTaskStatusAction
} from '../store/todoSlice'
import TodoListSorting from './TodoListSorting';
import { useGetAllTodosQuery } from '../store/services/todos';
import { useGetAllTasksQuery } from '../store/services/tasks';
import { TaskList, User } from '@prisma/client';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authSlice';
export type filterValuesType = "completed" | "active" | "all";
export type btnDisplayType = 'none' | 'block';

export type TodoListType = {
    id: string,
    title: string,
    filter: filterValuesType
    color: string
    time: string | null
    createTime: Date
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const isTLCompleted = (tl: TodoListType, tasksObj: TasksStateType): boolean => {
    const taskForTodoList = tasksObj[tl.id]
    if (taskForTodoList.every(t => t.isDone === true)
        && taskForTodoList.length > 0) {
        return true
    }
    else return false
}

const Content = () => {
    const user = useSelector(selectUser)

    const { data: dataTodos, isLoading: isLoadingTodos } = useGetAllTodosQuery()
    const { data: dataTasks, isLoading: isLoadingTasks } = useGetAllTasksQuery()
    const dispatch = useAppDispatch();

    const {
        list,
        filteredList,
        tasksList
    } = useAppSelector(state => state.todoLists)

    useLayoutEffect(() => {
        dispatch(todoFilterAll(null))
    }, [list])
    const [openModal, setOpenModal] = useState(false);
    const [color, setColor] = useState('#382933');
    const [todoDate, setTodoDate] = useState<string | null>(null);
    const [timeValue, setTimeValue] = useState<string | null>(null);
    const [btnDisplay, setBtnDisplay] = useState<btnDisplayType | null>(null);
    const [openSnack, setOpenSnack] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string | null>(null)

    const handleOpenDialog = () => setOpenModal(true)

    const handleOpenSnack = (todolistId: string) => {
        let getTodo = list.find(l => l.id === todolistId)
        getTodo ? setTodoTitle(getTodo.title) : setTodoTitle('')
        setOpenSnack(true);
    }

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    }

    const changeTaskStatus = (tasksId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAction({ todolistId, tasksId, isDone }))
    }

    const changeTaskTitle = (tasksId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAction({ todolistId, tasksId, newTitle }))
    }

    const onChangeTodoListTitle = (newTitle: string, todolistId: string) => {
        dispatch(todoChangeTitle({ todolistId, newTitle }))
    }

    const editHandler = (newTitle: string, newColor: string, newTodoDate: string, todolistId: string) => {
        dispatch(todoEditHandler({ todolistId, newTitle, newColor, newTodoDate }))
    }

    const changeFilter = (value: filterValuesType, todolistId: string) => {
        dispatch(todoChangeFilter({ todolistId, value }))
    }

    const removeTask = (tasksId: string, todolistId: string) => {
        dispatch(removeTaskAction({ todolistId, tasksId }))
    }

    const createTask = (newTitle: string, todolistId: string) => {
        dispatch(createTaskAction({ todolistId, newTitle }))
    }

    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodo({ todolistId, handleOpenSnack }))
    }

    const createTodoList = (title: string) => {
        dispatch(createTodo({ title, color, todoDate, tasksList }))
    }
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
                <TodoListFiltering
                    tasksObj={tasksList}
                    isTLCompleted={isTLCompleted}
                />
                <TodoListSorting />
            </div>

            <AnimatePresence>
                <div className="container">
                    <Container fixed>
                        <Grid container>
                            {
                                dataTodos && dataTodos.map(dTodos => {
                                    let taskForTodoList: TaskList[] | undefined = dataTasks?.filter(dTasks => dTodos.id === dTasks.todoId)

                                    if (dTodos.filter === 'completed') {
                                        taskForTodoList = taskForTodoList?.filter(t => {
                                            const tIsDone = Boolean(t.isDone);
                                            return tIsDone === true
                                        })
                                    }

                                    if (dTodos.filter === 'active') {
                                        taskForTodoList = taskForTodoList?.filter(t => {
                                            const tIsDone = Boolean(t.isDone);
                                            return tIsDone === false
                                        })
                                    }

                                    return (
                                        <Grid item margin={'26px'}>
                                            <TodoList
                                                key={dTodos.id}
                                                todoListId={dTodos.id}
                                                title={dTodos.title}
                                                color={dTodos.color}
                                                setColor={setColor}
                                                time={dTodos.time}
                                                createTime={dTodos.createTime}
                                                timeValue={timeValue}
                                                todoDate={todoDate}
                                                setTodoDate={setTodoDate}
                                                task={taskForTodoList}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                createTask={createTask}
                                                changeTaskStatus={changeTaskStatus}
                                                filter={dTodos.filter}
                                                removeTodolist={removeTodoList}
                                                changeTaskTitle={changeTaskTitle}
                                                onChangeTodoListTitle={onChangeTodoListTitle}
                                                handleOpenDialog={handleOpenDialog}
                                                editHandler={editHandler}
                                            />

                                        </Grid>
                                    )
                                })
                            }
                            <button
                                onClick={handleOpenDialog}
                                className='create__task--btn'
                                style={btnDisplay ? { display: btnDisplay } : {}}
                            >
                                <ControlPoint sx={{
                                    height: '150px',
                                    width: '150px',
                                    transition: '0.4s',
                                    opacity: '0.4',
                                    ":hover": { opacity: '0.7' }
                                }} />
                            </button>
                        </Grid>
                        <ModalWindow
                            color={color}
                            setColor={setColor}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            createTodoList={createTodoList}
                            todoDate={todoDate}
                            setTodoDate={setTodoDate}
                        />
                        <SnackBarDelete open={openSnack} onClose={handleCloseSnack} todoTitle={todoTitle} />
                    </Container>
                </div>
            </AnimatePresence>
        </div >
    );
};

export default Content;