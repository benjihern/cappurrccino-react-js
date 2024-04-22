import { useNavigate, useParams } from 'react-router-dom';
import classes from './foodEdit.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getById } from '../../services/foodService';
import InputContainer from '../Login/components/InputContainer/InputContainer';
import Title from '../Menu/components/Title/Title';
import Input from '../Login/components/Input/input';
import Button from '../Login/components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { toast } from 'react-toastify';
import { add, update } from '../../services/foodService';

export default function FoodEditPage() {
    const { foodId } = useParams();
    const [imageUrl, setImageUrl] = useState();
    const isEditMode = !!foodId;

    const navigate = useNavigate();

    const {
      handleSubmit,
      register,
      formState: { errors },
      reset,
    } = useForm();

    useEffect(() => { 
      if (!isEditMode) return;

      getById(foodId).then(food => {
        if (!food) return;
        reset(food);
        setImageUrl(food.imageUrl);
      });
    }, [foodId]);

    const submit = async foodData => {
      const food = { ...foodData, imageUrl };

      if (isEditMode) {
        await update(food);
        toast.success(`Food "${food.name}" updated successfully!`);
        return;
      }

      const newFood = await add(food);
      toast.success(`Food "${food.name}" added successful!`);
      navigate('/admin/editFood/' + newFood.id, { replace: true });
    };

    const upload = async event => {
      setImageUrl(null);
      const imageUrl = await uploadImage(event);
      setImageUrl(imageUrl);
    };


  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />
        <form
          className={classes.form}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="blank">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}

          <Input
            type="text"
            label="Name"
            {...register('name', { required: true})}
            error={errors.name}
          />
          <Input
            type="text"
            label="Description"
            {...register('description', { required: true})}
            error={errors.description}
          />
          <Input
            type="number"
            label="Price"
            {...register('price', { required: true})}
            error={errors.price}
          />
          <Input
            type="text"
            label="Tags"
            {...register('tags')}
            error={errors.tags}
          />

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  )
}

