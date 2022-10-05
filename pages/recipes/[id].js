import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import classes from './recipes.module.scss';
import Title from '../../components/text/Title';
import PointText from '../../components/text/PointText';
import IngredientsTable from '../../components/recipes/Ingredients';
import Text from '../../components/text/Text';
import { Button } from '../../components/button/Button';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaRegCalendarMinus, FaRegCalendarPlus } from 'react-icons/fa';

export const getSingleRecipe = async ({ queryKey }) => {
	const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
	return data?.meals?.[0];
};

function SingleRecipe() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading, isError } = useQuery(
		['singleRecipe', id],
		getSingleRecipe
	);
	const [isSaved, setIsSaved] = React.useState(false);

	useEffect(() => {
		if (localStorage.getItem('savedRecipes')) {
			const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
			if (savedRecipes.includes(id)) {
				setIsSaved(true);
			} else {
				setIsSaved(false);
			}
		} else {
			localStorage.setItem('savedRecipes', JSON.stringify([]));
		}
	}, [id]);

	if (isError) {
		return <div>Error</div>;
	}

	if (isLoading || !data) {
		return <BeatLoader color="#fff" size={20} />;
	}

	const ingredients = Object.keys(data)
		.filter(key => key.startsWith('strIngredient'))
		.filter(key => data[key] !== '' && data[key] !== null);

	const ingredientsWithMeasures = ingredients.map((key, index) => ({
		index: index + 1,
		ingredient: data[key],
		measure: data[`strMeasure${index + 1}`],
	}));

	const handleSaveButtonClick = async () => {
		const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
		if (!isSaved) {
			savedRecipes.push(data.idMeal);
			localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
			toast.success('Recipe saved.');
			setIsSaved(true);
		} else {
			savedRecipes.splice(savedRecipes.indexOf(data.idMeal), 1);
			localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
			setIsSaved(false);
			toast.error('Recipe removed.');
		}
	};

	return (
		<div className={classes.pageWrapper}>
			<div className={classes.topContainer}>
				<div className={classes.img}>
					<Image
						src={data.strMealThumb}
						height={300}
						width={300}
						alt={data.strMeal}
					/>
				</div>
				<div className={classes.info}>
					<Title variant="primary">{data.strMeal}</Title>
					<PointText className={classes.infoText}>
						Category: {data.strCategory}
					</PointText>
					<PointText className={classes.infoText}>
						Region: {data.strArea}
					</PointText>
					<PointText className={classes.infoText}>
						tags: {data?.strTags?.split(',').join(', ')}
					</PointText>

					{isSaved && <Text className={classes.greenText}>Saved.</Text>}

					<Button
						variant="primary"
						className={classes.saveButton}
						onClickHandler={handleSaveButtonClick}
					>
						{isSaved ? (
							<>
								<FaRegCalendarMinus /> Remove
							</>
						) : (
							<>
								<FaRegCalendarPlus className={classes.saveIcon} /> Save
							</>
						)}
					</Button>
				</div>
			</div>
			<div className={classes.ingredientsTable}>
				<IngredientsTable ingredientsWithMeasures={ingredientsWithMeasures} />
			</div>
			<div className={classes.instructions}>
				<Title>Instructions</Title>
				{data.strInstructions
					.split('.')
					.filter(sentence => sentence !== '')
					.map(sentence => (
						<PointText key={sentence}>{sentence}.</PointText>
					))}
			</div>
		</div>
	);
}

export default SingleRecipe;
