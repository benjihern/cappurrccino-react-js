import React, { useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import classes from "./foodPage.module.css"
import { getById } from '../../services/foodService';
import Tags from '../Menu/components/Tags/Tags';
import Price from '../Menu/components/Price/Price';

export default function FoodPage() {
    const [food, setFood] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);

    return (
        <>
            { food && ( 
                <div className={classes.container}>
                    <img className={classes.image}
                    src={`/foods/${food.imageUrl}`}
                    alt={food.name} 
                    />

                    <div className={classes.details}>
                        <div className={classes.header}>
                            <span className={classes.name}>{food.name}</span>
                        </div>
                        <div className={classes.tags}>
                            {food.tags && (
                                <Tags
                                    tags={food.tags.map(tag => ({ name: tag }))}
                                    forFoodPage={true}
                                />
                            )}
                        </div>
                        <div className={classes.description}>
                            <span>
                                <strong>{food.description}</strong>
                            </span>
                        </div>
                        <div className={classes.price}>
                            <Price price={food.price}></Price>
                        </div>

                        <button>Add To Cart</button>
                    </div>

                </div>
            )}
        </>
    );
};
