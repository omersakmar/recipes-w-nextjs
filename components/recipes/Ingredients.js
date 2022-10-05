import React from 'react';
import Text from '../text/Text';
import Title from '../text/Title';
import classes from './Ingredients.module.scss';

function IngredientsTable({ ingredientsWithMeasures }) {
	return (
		<>
			<Title className={classes.title}>Ingredients</Title>
			<table className={classes.ingredientsTable}>
				<tbody>
					{ingredientsWithMeasures.map(ingredient => (
						<tr key={ingredient.index}>
							<td>
								<Text className={[classes.table_text]}>
									{ingredient.ingredient}
								</Text>
							</td>
							<td>
								<Text className={[classes.table_text]}>
									{ingredient.measure}
								</Text>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default IngredientsTable;
