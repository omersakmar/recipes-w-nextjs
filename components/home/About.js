import Text from '../text/Text';
import Title from '../text/Title';
import classes from './About.module.scss';

function About() {
	return (
		<div className={classes.about}>
			<Title className={classes.title}>It is wednesday, my dudes</Title>
			<Text>
				What's this app about? Well it's my poor attempt at understanding how
				Next.js works. It seems nice.
			</Text>
		</div>
	);
}

export default About;
