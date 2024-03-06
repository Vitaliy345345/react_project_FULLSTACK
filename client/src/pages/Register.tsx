import React from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { Paths } from '../paths';

interface FormRegisterValues {
    email: string,
    name: string,
    password: string
}

const Register = () => {
    const form = useForm<FormRegisterValues>({
        defaultValues: {
            email: '',
            name: '',
            password: ''
        }
    })

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    const onSubmit = (data: FormRegisterValues) => {
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
                        Registration
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
                        label='name'
                        type='text'
                        {...register('name', {
                            required: 'Name is required'
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                        If you already have an account <Link style={{ textDecoration:'none' }} to={Paths.login}>Log in</Link>
                    </Typography>
                    <Button type='submit' variant='contained' color='success'>
                        Sign up
                    </Button>
                </Stack>
            </form>
        </>
    );
};

export default Register;