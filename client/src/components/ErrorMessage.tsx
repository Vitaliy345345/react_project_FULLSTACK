import { Alert } from '@mui/material';
import React from 'react';

interface Props {
    message?: string
}

const ErrorMessage = ({message}: Props) => {
    if(!message) return null

    return <Alert variant='outlined' severity='error'>{message}</Alert>
};

export default ErrorMessage;