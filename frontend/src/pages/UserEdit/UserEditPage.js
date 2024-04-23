import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import { getById, updateUser } from '../../services/userService';
import classes from './userEditPage.module.css';
import Title from '../Menu/components/Title/Title';
import Input from '../Login/components/Input/input';
import { EMAIL } from '../../constants/patterns';
import Button from '../Login/components/Button/Button';

export default function UserEditPage() {

    const {
        register, 
        reset, 
        handleSubmit, 
        formState: { errors }, } = useForm();

    const { userId } = useParams();
    const isEditMode = userId;

    useEffect(() => {
        if(isEditMode) loadUser();
    }, [userId]);

    const loadUser = async () => {
        const user = await getById(userId);
        reset(user);
    }

    const submit = (userData) => {
        updateUser(userData);
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title title={isEditMode ? 'Edit User' : 'Add User'} />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input 
                        label="Name"
                        {...register('name', { required: true, minLength: 3 })}
                        error={errors.name}
                    />
                    <Input 
                        label="Email"
                        {...register('email', { required: true, pattern: EMAIL })}
                        error={errors.email}
                    />
                    <Input 
                        label="Is Admin"
                        type="checkbox"
                        {...register('isAdmin')}
                    />
                    <Button type="submit" />
                </form>
            </div>
        </div>
    )
}
