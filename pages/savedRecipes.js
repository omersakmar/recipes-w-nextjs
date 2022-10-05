import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import PointText from '../components/text/PointText';
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import { getSingleRecipe } from './recipes/[id]';
import classes from './savedRecipes.module.scss';

function SavedRecipes() {
	const [savedRecipeId, setSavedRecipeId] = useState([]);

	const queries = savedRecipeId.map(id => ({
		queryKey: ['singleRecipe', id],
		queryFn: getSingleRecipe,
	}));

	const result = useQueries({ queries });

	useEffect(() => {
		if (localStorage.getItem('savedRecipes')) {
			setSavedRecipeId(JSON.parse(localStorage.getItem('savedRecipes')));
		}
	}, []);

	return (
		<div className={classes.pageWrapper}>
			<Title variant="primary" className={classes.pageTitle}>
				My Saved Meal List
			</Title>
			<div className={classes.list_container}>
				{savedRecipeId.length <= 0 && <Text>You have no saved meals</Text>}
				{result &&
					result.map(({ data, isLoading }, index) => {
						if (isLoading) {
							return (
								<BeatLoader
									key={savedRecipeId[[index]]}
									color="#fff"
									loading={isLoading}
									size={20}
								/>
							);
						}

						return (
							<Link href={`/recipes/${data.idMeal}`} key={data.idMeal}>
								<a className={classes.singleMeal}>
									<Title variant="secondary" className={classes.mealTitle}>
										{data.strMeal}
									</Title>
									<PointText>Category: {data.strCategory}</PointText>
									<PointText>Region: {data.strArea}</PointText>
								</a>
							</Link>
						);
					})}
			</div>
		</div>
	);
}

export default SavedRecipes;
