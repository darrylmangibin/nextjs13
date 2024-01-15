import React, { FC, PropsWithChildren } from 'react';
import Header from './components/Header';

export interface RestaurantLayoutProps extends PropsWithChildren {
	params: {
		slug: string;
	};
}

const RestaurantLayout: FC<RestaurantLayoutProps> = ({ children, params }) => {
	return (
		<main>
			<Header name={params.slug} />
			<div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
				{children}
			</div>
		</main>
	);
};

export default RestaurantLayout;
