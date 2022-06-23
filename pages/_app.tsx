import { AppProps } from 'next/app';
import Layout from '../components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout>
			<Component {...pageProps} />
			<style jsx global>{`
				html,
				body {
					width: 100%;
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
					background-color: #2f3640;
					color: white;
				}
				a {
					color: inherit;
					text-decoration: none;
				}
				* {
					box-sizing: border-box;
				}
			`}</style>
		</Layout>
	);
};

export default App;
