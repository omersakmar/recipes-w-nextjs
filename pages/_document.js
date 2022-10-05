import { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Mirza:wght@700&family=Poppins:wght@400&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<body>
				<Main></Main>
				<NextScript></NextScript>
			</body>
		</Html>
	);
}

export default MyDocument;
