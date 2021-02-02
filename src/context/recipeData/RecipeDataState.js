import React, { useReducer } from "react";

import RecipeDataContext from "./recipeDataContext";
import RecipeDataReducer from "./RecipeDataReducer";

import { GET_RECIPE_INFO, GET_EQUIPMENTS, GET_INGREDIENTS } from "../types";

const RecipeDataState = (props) => {
	const initialState = {
		recipeData: {},
		recipeIngredients: [],
		recipeEquipments: [],

		loading: true,
	};
	const [state, dispatch] = useReducer(RecipeDataReducer, initialState);

	const getRecipeInfo = async (id) => {
		const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false
        `);
		const data = await res.json();

		dispatch({ type: GET_RECIPE_INFO, payload: data });
	};

	const getRecipeIngredients = async (id) => {
		const res = await fetch(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}
        `);
		const data = await res.json();

		dispatch({ type: GET_INGREDIENTS, payload: data.ingredients });
	};

	const getRecipeEquipments = async (id) => {
		const res = await fetch(`https://api.spoonacular.com/recipes/${id}/equipmentWidget.json?apiKey=${process.env.REACT_APP_API_KEY}
        `);
		const data = await res.json();

		dispatch({ type: GET_EQUIPMENTS, payload: data.equipment[0] });
	};

	return (
		<RecipeDataContext.Provider
			value={{
				recipeData: state.recipeData,
				recipeEquipments: state.recipeEquipments,
				recipeIngredients: state.recipeIngredients,
				loading: state.loading,
				getRecipeInfo,
				getRecipeEquipments,
				getRecipeIngredients,
			}}
		>
			{props.children}
		</RecipeDataContext.Provider>
	);
};

export default RecipeDataState;