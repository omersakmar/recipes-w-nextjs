import React from 'react';
import Footer from './Footer';
import classes from './Layout.module.scss';
import Navbar from './Navbar';
function Layout({ children }) {
	return (
		<>
			<div className={classes.container}>
				<Navbar />
				{children}
			</div>
			<Footer />
		</>
	);
}

export default Layout;
