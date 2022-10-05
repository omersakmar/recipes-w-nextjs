import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Title from '../text/Title';
import classes from './RecipeItem.module.scss';

function RecipeItem({ meal }) {
	return (
		<Link href={`/recipes/${meal.idMeal}`}>
			<a className={classes.item}>
				<Image
					src={meal.strMealThumb}
					height="200"
					width="300"
					alt={meal.strMeal}
				/>
				<Title className={classes.title} variant="secondary">
					{meal.strMeal}
				</Title>
			</a>
		</Link>
	);
}

export default RecipeItem;
