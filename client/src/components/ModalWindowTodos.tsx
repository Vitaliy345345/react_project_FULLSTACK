import React, { useState } from 'react';
import '../styles/modal.css'
import AddItemForm from './AddItemForm';
import DatePickerComponent from './DatePickerComponent';

import ColorPicker from './ColorPicker';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { UserData } from '../store/services/auth';

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    openModal: boolean
    createTodoList: (title: string) => void
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    setTodoDate: React.Dispatch<React.SetStateAction<Date | null>>
    todoDate: Date | null
}

const ModalWindowTodos = ({ openModal,
    setOpenModal,
    createTodoList,
    color,
    setColor,
    setTodoDate,
    todoDate,
}: Props) => {
    
    const form = useForm<UserData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    const onSubmit = () => {

    }

    return (
        <div className={openModal ? 'modal active' : 'modal'} onClick={() => setOpenModal(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create todo</h2>
                    <div>
                        <TextField 

                        />
                        <ColorPicker color={color} setColor={setColor} textColor='black' />
                        <DatePickerComponent todoDate={todoDate} setTodoDate={setTodoDate} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalWindowTodos;