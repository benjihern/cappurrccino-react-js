import React from 'react';
import {useLoading} from '../../Hooks/useLoading';
import classes from './loading.module.css';

export default function Loading() {
    const {isLoading} = useLoading();
    if (!isLoading) return;
    return <div className={classes.container}>
        <div className={classes.items}>
            {
            /* From video
            <img src="/loading.svg" alt="Loading!" />
            <h1>Loading...</h1> */
            }
            <img src="/cat_rolling.gif" alt="Loading!" />
            <h1>Loading...</h1>
        </div>
    </div>;
}