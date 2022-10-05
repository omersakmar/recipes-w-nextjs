import React from 'react';
import classes from './SearchBar.module.scss';

function SearchBar({ searchInput, setSearchInput }) {
	return (
		<>
			<input
				className={classes.input}
				value={searchInput}
				onChange={e => setSearchInput(e.target.value)}
				placeholder="Search recipes..."
			/>
		</>
	);
}

export default SearchBar;
