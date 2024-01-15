import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';
import { FC } from 'react';
import prisma from '../../../lib/prisma';
import { Item } from '@prisma/client';

const ferchRestaurantMenu = async (slug: string): Promise<Item[]> => {
	const restaurant = await prisma.restaurant.findUnique({
		where: {
			slug,
		},
		select: {
			items: true,
		},
	});

	if (!restaurant?.items) {
		throw new Error();
	}

	return restaurant.items;
};

const RestaurantMenu: FC<{ params: { slug: string } }> = async ({ params }) => {
	const menu = await ferchRestaurantMenu(params.slug);

	return (
		<div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
			<div className='bg-white w-[100%] rounded p-3 shadow'>
				<RestaurantNavBar slug={params.slug} />
				<Menu menu={menu} />
			</div>
		</div>
	);
};

export default RestaurantMenu;
