import { Button, Menu, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { todosApiType } from '../store/services/todos';
import { FormTodoValues } from './ModalWindowTodos';

interface ColorPickerPropsType {
    color: string
    setColor: React.Dispatch<React.SetStateAction<string>>
    textColor: string
    control?: Control<FormTodoValues, any>
}

const ColorPicker: React.FC<ColorPickerPropsType> = ({ color, setColor, textColor, control }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const colors = [
        '#382933',
        '#3B5249',
        '#59405C',
        '#7D0633',
        '#87431D',
        '#900C3F',
        '#4E31AA',
        '#4C0033',
        '#064663'
    ]

    return (
        <div>
            <div className='color__content'>
                <h2 style={{ color: `${textColor}` }}>Chose color: </h2>

                {
                    control !== null && <Controller
                        control={control}
                        name='color'
                        render={({ field }) => {
                            return (
                                <Menu anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <TwitterPicker
                                        color={field.value}
                                        colors={colors}
                                        onChangeComplete={(color) => { 
                                            setColor(color.hex);
                                            field.onChange(color.hex) 
                                        }} />
                                </Menu>
                            )
                        }}
                    />
                }

                <Button
                    variant='contained'
                    className='button__color'
                    style={{ backgroundColor: color }}
                    onClick={handleClick}>
                </Button>
            </div>
        </div>
    )
};

export default ColorPicker;