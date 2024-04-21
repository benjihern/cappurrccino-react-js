import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import classes from './loginpage.module.css';
import Title from '../Menu/components/Title/Title';
import Input from './components/Input/input';
import Button from './components/Button/Button';
import { EMAIL } from '../../constants/patterns';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/'); 
  }, [user]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <div className={classes.title}>Login </div>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
          type="email"
          label="Email"
          {...register('email', {
            required: true,
            pattern: EMAIL,
          } )}
          error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" />

          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register?${returnUrl ? 'returnUrl=' + returnUrl: ''}`}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
