import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/recipes/SearchBar';
import PointText from '../../components/text/PointText';
import Categories from '../../components/category/Categories';
import RecipeItem from '../../components/recipes/RecipeItem';
import classes from './recipes.module.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import BeatLoader from 'react-spinners/BeatLoader';
import Text from '../../components/text/Text';

const override = {
	display: 'inline-block',
	margin: '0 auto',
};

const getMeals = async ({ queryKey }) => {
	const { data } = await axios.get(`filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

const getQueriedMeals = async ({ queryKey }) => {
	const { data } = await axios.get(`search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

const getCategories = async () => {
	const { data } = await axios.get('/categories.php');
	return data.categories;
};

function Recipes() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [query, setQuery] = useState('');

	const {
		data: categories,
		isLoading: categoryIsLoading,
		isError: categoryIsError,
		error: categoryError,
	} = useQuery(['catagories'], getCategories);

	const {
		data: queriedData,
		isLoading: queryIsLoading,
		isError: queryError,
	} = useQuery(['mealsByQuery', query], getQueriedMeals, {
		enabled: query !== '',
	});

	const { data, isLoading, isError } = useQuery(
		['mealsByCategory', selectedCategory],
		getMeals,
		{
			enabled: query === '',
		}
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (searchInput) {
				setQuery(searchInput);
				setSelectedCategory('');
			} else {
				setQuery('');
				if (categories) {
					setSelectedCategory(categories[0].strCategory);
				}
			}
		}, 300);
		return () => {
			setQuery('');
			clearTimeout(timeout);
		};
	}, [searchInput, categories]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (searchInput) {
				setQuery(searchInput);
				setSelectedCategory('');
			} else {
				setQuery('');
				if (categories) {
					setSelectedCategory(categories[0].strCategory);
				}
			}
		}, 300);
		return () => {
			setQuery('');
			clearTimeout(timeout);
		};
	}, [searchInput, categories]);

	useEffect(() => {
		if (categories) {
			setSelectedCategory(categories[0].strCategory);
		}
	}, [categories]);

	return (
		<div className={classes.meals__page}>
			<SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
			<PointText className={classes.text}>
				Search recipes, or just go through some of the ones listed below.
			</PointText>

			<Categories
				setSelectedCategory={setSelectedCategory}
				selectedCategory={selectedCategory}
				categories={categories}
				categoryIsLoading={categoryIsLoading}
				categoryIsError={categoryIsError}
				categoryError={categoryError}
				setQuery={setQuery}
			/>
			{isLoading || categoryIsLoading ? (
				<div className={classes.loadingSpinner}>
					<BeatLoader
						color="#000"
						loading={isLoading || categoryIsLoading}
						cssOverride={override}
						size={20}
					/>
				</div>
			) : null}

			<div className={classes.meals__container}>
				{!isLoading &&
					!isError &&
					data &&
					data.map(meal => <RecipeItem key={meal.idMeal} meal={meal} />)}
				{!queryIsLoading &&
					!queryError &&
					queriedData &&
					queriedData.map(meal => <RecipeItem key={meal.idMeal} meal={meal} />)}
				{data &&
					queriedData &&
					data.length === 0 &&
					queriedData.length === 0 && <Text>No meals found</Text>}
			</div>
		</div>
	);
}

export default Recipes;
