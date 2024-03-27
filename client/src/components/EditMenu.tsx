import { Button, Menu, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { darkGray } from '../constants';
import { useEditTodoMutation, useGetOneTodoQuery } from '../store/services/todos';
import { isErrorWithMessage } from '../utils/isErrorWithMessage';
import ColorPicker from './ColorPicker';
import DatePickerComponent from './DatePickerComponent';
import ErrorMessage from './ErrorMessage';
import { FormTodoValues } from './ModalWindowTodos';

interface Props {
    open: boolean
    anchorEl: HTMLElement | null
    onClose: () => void
    title: string
    onChange: (title: string, color: string, newTodoDate: string) => void
    color: string
    time: string | null
    todoId: string
}

const EditMenu = ({ open, onClose, anchorEl, title, onChange, color, time, todoId }: Props) => {
    const [newTitle, setNewTitle] = useState<string>('')
    const [newColor, setNewColor] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [newTodoDate, setNewTodoDate] = useState<string | null>(null)
    const { data, isLoading } = useGetOneTodoQuery(todoId || '')
    const [editTodo, editTodoResult] = useEditTodoMutation()

    useEffect(() => {
        setNewTitle(title)
        setNewColor(color)
        setNewTodoDate(time)
    }, [open])

    const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value)
    }
    const onClickConfirmHandler = () => onClose()



    const form = useForm<FormTodoValues>({
        defaultValues: {
            title: '',
            color: '',
            time: ''
        }
    })

    const { register, handleSubmit, formState, control } = form

    const { errors } = formState

    const onSubmit = async (todo: FormTodoValues) => {
        try {
            const editedTodo = {
                ...data,
                ...todo
            }
            console.log(todoId)
            await editTodo(editedTodo).unwrap()
        } catch (error) {
            const maybeError = isErrorWithMessage(error)

            if (maybeError) {
                setError(error.data.message);
            } else {
                setError('Unknown error')
            }
        }
    }

    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            PaperProps={{
                style: {
                    backgroundColor: `${darkGray}`,
                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', gap: '10px' }}>
                <Typography color='white'>
                    Edit
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant='filled'
                        color='success'
                        label='title'
                        inputProps={{ style: { color: "white" } }}
                        value={newTitle}
                        {
                        ...register('title', {
                            required: 'Title is required'
                        })
                        }
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        onChange={onChangeTitleHandler}
                    />
                    <ColorPicker control={control} color={newColor} setColor={setNewColor} textColor='white' />
                    <DatePickerComponent control={control} />
                    <Button
                        type='submit'
                        variant='contained'
                        color='success'
                        fullWidth
                        onClick={onClickConfirmHandler}
                    >
                        Confirm
                    </Button>
                </form>
            </div>
            <ErrorMessage message={error} />
        </Menu>
    );
};

export default EditMenu;
