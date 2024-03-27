import * as React from 'react';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormTodoValues } from './ModalWindowTodos';

interface DatePickerComponentPropType {
    control?: Control<FormTodoValues, any>
}

function DatePickerComponent({ control }: DatePickerComponentPropType) {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
            <Stack spacing={2} sx={{ minWidth: 305 }}>
                {
                    control !== null && <Controller
                        control={control}
                        name='time'
                        rules={{ required: true }}
                        render={({ field }) => {
                            return (
                                <DateTimePicker
                                    value={field.value}
                                    inputRef={field.ref}
                                    label='Date'
                                    onChange={(time) => {
                                        field.onChange(time)
                                    }}
                                    disablePast
                                    closeOnSelect
                                />
                            )
                        }}
                    />
                }
            </Stack>
        </LocalizationProvider>
    );
}

export default DatePickerComponent