import {connect, set} from 'mongoose';
import {FoodModel} from '../models/food.model.js';
import {sample_foods} from '../data.js';

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database has connected!');
        await seedFoods();
    }
    catch (error) {
        console.log('Database has failed to connect');
        console.log(error);
    }
};

async function seedFoods() {
    const foods = await FoodModel.countDocuments();
    if (foods > 0) {
        console.log('Foods seed has already been done!');
        return;
    }

    for (const food of sample_foods) {
        food.imageUrl = `/foods/${food.imageUrl}`;
        await FoodModel.create(food);
    }

    console.log('Foods seed has been done!');
}