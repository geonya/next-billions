import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Seo from '../components/Seo';

interface IBillion {
	id: string;
	name: string;
	squareImage: string;
	netWorth: number;
	industries: string[];
}

const Home: NextPage = () => {
	const [billions, setBillions] = useState<IBillion[]>([]);
	useEffect(() => {
		(async () => {
			const data = await (
				await fetch('https://billions-api.nomadcoders.workers.dev')
			).json();
			setBillions(data);
		})();
	}, []);
	return (
		<div className='container'>
			<Seo title='Home' />
			<h1 className='title'>Next Billions</h1>
			<div className='billions-grid'>
				{billions?.map((billion, i) => (
					<Link
						className='billion-link'
						href={{
							pathname: `/person/${billion.id}`,
						}}
						as={`/person/${billion.id}`}
						key={i}
					>
						<div className='billion'>
							<img className='billion-picture' src={billion.squareImage} />
							<h4>{billion.name}</h4>
							<span>{`${billion.netWorth}billion / ${billion.industries[0]}`}</span>
						</div>
					</Link>
				))}
			</div>
			<style jsx>{`
				.container {
				}
				.title {
					text-align: center;
				}
				.billions-grid {
					width: 100%;
					display: grid;
					grid-gap: 20px;
					grid-template-columns: repeat(4, 1fr);
				}
				.billion {
					cursor: pointer;
					display: flex;
					flex-direction: column;
					background-color: #353b48;
					padding: 20px;
					border-radius: 10px;
				}
				.billion-picture {
					width: 100%;
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
};

export default Home;
