import React, { useState } from 'react';
import '../styles/modal.css'
import AddItemForm from './AddItemForm';
import DatePickerComponent from './DatePickerComponent';

import ColorPicker from './ColorPicker';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAddTodoMutation } from '../store/services/todos';
import { filterValuesType } from './Content';
import { isErrorWithMessage } from '../utils/isErrorWithMessage';
import ErrorMessage from './ErrorMessage';

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    openModal: boolean
    createTodoList: (title: string) => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    setTodoDate: React.Dispatch<React.SetStateAction<string | null>>
    todoDate: string | null
}

export interface FormTodoValues {
    id: string,
    title: string,
    color: string,
    time: string,
    createTime: string,
    filter: filterValuesType,
    userId: string
}

const ModalWindowTodos = ({ openModal,
    setOpenModal,
    createTodoList,
    color,
    setColor,
    setTodoDate,
    todoDate,
}: Props) => {

    const form = useForm<FormTodoValues>({
        defaultValues: {
            title: '',
            color: '',
            time: ''
        }
    })

    const [error, setError] = useState('')

    const [addTodo, addTodoResult] = useAddTodoMutation()

    const { register, handleSubmit, formState, control } = form;

    const { errors } = formState;

    const onSubmit = async (data: FormTodoValues) => {
        try {
            await addTodo(data).unwrap()
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
        <div className={openModal ? 'modal active' : 'modal'} onClick={() => setOpenModal(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create todo</h2>
                    <div>
                        <TextField
                            label='title'
                            type='title'
                            {
                            ...register('title')
                            }
                        />
                        <ColorPicker control={control} color={color} setColor={setColor} textColor='black' />
                        <DatePickerComponent control={control}/>
                        <Button type='submit' variant='contained' color='success'>
                            Add
                        </Button>
                        <ErrorMessage message={error} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalWindowTodos;