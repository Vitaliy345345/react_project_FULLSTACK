import { Visibility, VisibilityOff } from '@mui/icons-material';
import { OutlinedInput, FormControl, IconButton, InputAdornment, InputLabel, TextField, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormLoginValues } from '../pages/Login';

interface Props {
  register: UseFormRegister<FormLoginValues>,
  errors: FieldErrors<FormLoginValues>

}

const PasswordTextField = ({ register, errors }: Props) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        {...register('password', {
          required: 'Password is required'
        })}
        error={!!errors.password}
        aria-describedby="component-error-text"
      />
      <FormHelperText id="component-error-text" >{errors.password?.message}</FormHelperText>
    </FormControl>
  );
};

export default PasswordTextField;