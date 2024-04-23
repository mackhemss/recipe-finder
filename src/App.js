import React, { useState } from 'react';
import './App.css'; // Import custom CSS file

function RecipeFinder() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    // Fetch recipes from the backend
    const response = await fetch(`https://recipe-finder-backend-b8c2be823fdc.herokuapp.com/api/recipes?ingredients=${encodeURIComponent(ingredients)}`);
    const data = await response.json();

    setRecipes(data);
    setLoading(false); // Set loading state to false after fetching data
  };

  return (
    <div className="recipe-finder-container">
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter ingredients:
          <input type="text" value={ingredients} onChange={handleChange} />
        </label>
        <button type="submit" disabled={!ingredients}>Search</button>
      </form>
      {loading && <p>Loading...</p>} {/* Show loading message while fetching data */}
      <div className="recipes-container">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.label}</h2>
            <ul>
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient.text}</li>
              ))}
            </ul>
            <img src={recipe.image} alt={recipe.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeFinder;