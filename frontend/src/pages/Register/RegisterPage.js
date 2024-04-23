import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Login/components/Input/input.js';
import Title from '../Menu/components/Title/Title';
import classes from './registerPage.module.css';
import Button from '../Login/components/Button/Button.js';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { EMAIL } from '../../constants/patterns.js';

export default function RegisterPage() {
    const auth = useAuth();
    const { user } = auth;
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user]);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        await auth.register(data);
    };

  return (
    <div className={classes.container}>
        <div className={classes.details}>
            <Title title="Register" />
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input 
                    type = "text"
                    label = "Name"
                    {
                        ...register('name', {
                            required: true,
                            minLength: 3,
                        })
                    }
                    error = {errors.name}
                />

                <Input 
                    type = "email"
                    label = "Email"
                    {
                        ...register('email', {
                            required: true,
                            pattern: EMAIL,
                        })
                    }
                    error = {errors.email}
                />

                <Input 
                    type = "password"
                    label = "Password"
                    {
                        ...register('password', {
                            required: true,
                            minLength: 5,
                        })
                    }
                    error = {errors.password}
                />

                <Input
                    type = "password"
                    label = "Confirm Password"
                    {
                        ...register('confirmPassword', {
                            required: true,
                            validate: value => 
                                value !== getValues('password')
                                ? 'Password does not match'
                                : true,
                        })
                    }
                    error = {errors.confirmPassword}
                />

                <Button type="submit" text="Register" />

                <div className={classes.login}>
                    Already a user? &nbsp;
                    <Link to={`/login?${returnUrl ? 'returnUrl=' + returnUrl : ''}`}>
                        Login here
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}
