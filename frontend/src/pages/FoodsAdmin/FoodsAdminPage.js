import { useEffect, useState } from 'react';
import classes from './foodsAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, search } from '../../services/foodService';
import NotFound from '../Menu/components/NotFound/NotFound';
import Title from '../Menu/components/Title/Title';
import Search from '../Menu/components/Search/Search';
import Price from '../Menu/components/Price/Price';
import { toast } from 'react-toastify';

export default function FoodsAdminPage() {

    const [foods, setFoods] = useState();
    const { searchTerm } = useParams();

    useEffect(() => {
        loadFoods();
    }, [searchTerm]);

    const loadFoods = async () => {
        const foods = searchTerm ? await search(searchTerm) : await getAll();
        setFoods(foods);
    };

    const FoodsNotFound = () => {
        if (foods && foods.length > 0) return;

        return searchTerm ? (
        <NotFound linkRoute="/admin/foods" linkText="Show All Foods" />
        ) : (
        <NotFound linkRoute="/dashboard" linkText="Back to Dashboard" />
        );
    };

    const deleteFood = async food => {
        const confirmed = window.confirm(`Are you sure you want to delete ${food.name}?`);
        if (!confirmed) return;

        await deleteById(food.id);
        toast.success(`"${food.name}" has been deleted!`);
        setFoods(foods.filter(f => f.id !== food.id));
    };

  return (
    <div className={classes.container}>
        <div className={classes.list}>
            <Title title="Manage Foods" margin="1rem auto" />
            <Search
                searchRoute="/admin/foods/"
                defaultRoute="/admin/foods"
                margin="1rem 0"
            />
            <Link to="/admin/addFood" className={classes.add_food}>
                Add Food +
            </Link>
            <FoodsNotFound />
            {
                foods &&
                foods.map( food => (
                    <div key={food.id} className={classes.list_item}>
                        <img src={food.imageUrl} alt={food.name} />
                        <Link to={'/food/' + food.id}>{food.name}</Link>
                        <Price price={food.price} />
                        <div className={classes.actions}>
                            <Link to={'/admin/editFood/' + food.id}>Edit</Link>
                            <Link onClick={() => deleteFood(food)}>Delete</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
