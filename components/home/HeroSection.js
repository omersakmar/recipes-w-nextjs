import React from 'react';
import Text from '../text/Text';
import classes from './HeroSection.module.scss';
import MainImage from '../../images/nigella-lawson-bc-why-not.png';
import ButtonWithLink from '../button/Button';
import Image from 'next/image';
function HeroSection() {
	return (
		<section className={classes.hero__section}>
			<div className={classes.hero__container}>
				<div className={classes.hero__info}>
					<h1 className={classes.hero__title}>
						This is a knock-off Next.js project.
					</h1>
					<Text>I love Nigella Lawson</Text>
					<div className={classes.hero__buttons}>
						<ButtonWithLink link="/recipes" variant="primary">
							Go through some recipes
						</ButtonWithLink>
						<ButtonWithLink link="/saved">Saved recipes</ButtonWithLink>
					</div>
				</div>
				<div className={classes.hero__img}>
					<Image src={MainImage} alt="nigella-lawson" />
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
