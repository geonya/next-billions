import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Seo from '../../../components/Seo';

interface IBillion {
	id: string;
	state: string;
	city: string;
	name: string;
	country: string;
	position: number;
	industries: string[];
	financialAssets: {
		exchange: string;
		ticker: string;
		companyName: string;
		numberOfShares: number;
		sharePrice: number;
		currencyCode: number;
		exchangeRate: number;
		interactive: boolean;
		currentPrice: number;
		exerciseOptionPrice: number;
	}[];
	thumbnail: string;
	squareImage: string;
	bio: string[];
	about: string[];
	netWorth: number;
}

const Person: NextPage = () => {
	const [billion, setBillion] = useState<IBillion | null>();
	const {
		query: { id },
	} = useRouter();
	useEffect(() => {
		(async () => {
			const data = await (
				await fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`)
			).json();
			setBillion(data);
		})();
	}, [id]);
	return (
		<Layout>
			<Seo title={billion?.name} />
			<div className='billion-profile'>
				<img src={billion?.squareImage} alt='' className='billion-picture' />
				<h1>{billion?.name}</h1>
				{billion?.bio.map((p, i) => (
					<span key={i}>{p}</span>
				))}
			</div>
			<div className='billion-assets'>
				{billion?.financialAssets?.map((asset) => (
					<div className='billion-asset'>
						<span className='asset-info'>Ticker : {asset?.ticker}</span>
						<span className='asset-info'>Shares : {asset?.numberOfShares}</span>
						{asset?.exerciseOptionPrice ? (
							<span className='asset-info'>
								Excercise Price : {asset?.exerciseOptionPrice}
							</span>
						) : null}
					</div>
				))}
			</div>
			<style jsx>{`
				.billion-profile {
					width: 100%;
					display: flex;
					flex-direction: column;
					background-color: #353b48;
					padding: 30px;
					border-radius: 20px;
					margin-top: 30px;
				}
				.billion-picture {
					width: 300px;
				}
				.billion-assets {
					width: 100%;
					background-color: #353b48;
					padding: 30px;
					border-radius: 20px;
					margin-top: 30px;
					display: grid;
					grid-gap: 20px;
					grid-template-columns: repeat(4, 1fr);
					grid-auto-rows: 150px;
				}
				.billion-asset {
					width: 100%;
					height: 100%;
					border: 1px solid rgba(255, 255, 255, 0.2);
					border-radius: 10px;
					padding: 10px;
				}
				.asset-info {
					display: block;
					padding: 5px;
				}
			`}</style>
		</Layout>
	);
};

export default Person;
