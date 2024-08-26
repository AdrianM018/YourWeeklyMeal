import React from 'react';
import Searchbar from '../SearchBar/Searchbar';
import { selectedCategory } from './MealCategories';


function SingleMealCategories() {


  return (
    <>
      <Searchbar />

      <p>{selectedCategory ? `Selected Category: ${selectedCategory}` : "No category selected"}</p>
    </>
  );
}

export default SingleMealCategories;
