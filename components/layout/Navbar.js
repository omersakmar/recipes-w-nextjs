import Image from 'next/image';
import React from 'react';
import classes from './Navbar.module.scss';
import Logo from '../../images/recipe-app-logo.png';
import Link from 'next/link';
function Navbar() {
	return (
		<nav className={classes.navbar}>
			<Link href="/">
				<a className={classes.logo}>
					<Image src={Logo} />
				</a>
			</Link>
			<ul className={classes.navLinks}>
				<li>
					<Link href={'/recipes'}>Recipes</Link>
				</li>
				<li>
					<Link href={'/savedRecipes'}>Saved recipes</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
