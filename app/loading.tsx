import React from 'react';
import Header from './components/Header';

const Loading = () => {
	return (
		<main>
			<Header />
			<div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
				{Array.from({ length: 12 }).map((_k, i) => (
					<div
						key={i}
						className='animate-pulse bg-slate-300 w-64 h-72 m-3 overflow-hidden border cursor-pointer'></div>
				))}
			</div>
		</main>
	);
};

export default Loading;
