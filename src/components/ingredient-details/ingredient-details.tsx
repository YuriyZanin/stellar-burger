import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../slices/ingredientSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingrediants = useSelector(selectIngredients);

  const ingredientData = ingrediants.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
