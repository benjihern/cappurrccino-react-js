import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Hooks/useAuth';
import classes from './profilePage.module.css';
import Title from '../Menu/components/Title/Title';
import Input from '../Login/components/Input/input';
import Button from '../Login/components/Button/Button';
import ChangePassword from '../../components/ChangePassword/ChangePassword';

export default function ProfilePage() {
    
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const { user, updateProfile } = useAuth();

    const submit = user => {
        updateProfile(user);
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.details}>
            <Title title="Update Profile" />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                defaultValue = {user.name}
                type = "text"
                label = "Name"
                {...register('name', {
                    required: true,
                    minLength: 3,
                })}
                error = {errors.name}
                />

                <Button type="submit" text="Update" backgroundColor="#009e84" />
            </form>

            <ChangePassword />
            </div>
        </div>
    )
}