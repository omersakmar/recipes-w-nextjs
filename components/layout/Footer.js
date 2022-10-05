import Image from 'next/image';
import React from 'react';
import classes from './Footer.module.scss';
import Logo from '../../images/recipe-logo-coloured.png';
import Text from '../text/Text';

function Footer() {
	return (
		<footer className={classes.footer}>
			<Image src={Logo} alt="recipe-app-coloured" />
			<Text className={[classes.footer_text]}>
				This app lets you search new recipes, and save them, kind of.
			</Text>
		</footer>
	);
}

export default Footer;
