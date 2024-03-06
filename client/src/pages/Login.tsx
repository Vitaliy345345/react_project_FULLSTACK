import React from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { Paths } from '../paths';
import PasswordTextField from '../UI/PasswordTextField';

export interface FormLoginValues {
    email: string,
    password: string
}

const Login = () => {

    const form = useForm<FormLoginValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    const onSubmit = (data: FormLoginValues) => {
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '80vh'

            }}>
                <Stack spacing={2} width={400} style={{
                    backgroundColor: 'white',
                    padding: '50px',
                    borderRadius: '20px',
                }}>
                    <Typography>
                        Login
                    </Typography>
                    <TextField
                        label='email'
                        type='email'
                        {...register('email', {
                            required: 'Email is required'
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label='password'
                        type='password'
                        {...register('password', {
                            required: 'Password is required'
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Typography>
                        If you don't have an account <Link style={{ textDecoration:'none' }} to={Paths.register}>Sign up</Link>
                    </Typography>
                    <Button type='submit' variant='contained' color='success'>
                        Login
                    </Button>
                </Stack>
            </form>
        </>
    );
};

export default Login;