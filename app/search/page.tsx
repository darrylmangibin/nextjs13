import Header from './components/Header';
import SearchSideBar from './components/SearchSideBar';
import RestaurantCard from './components/RestaurantCard';
import { NextPage } from 'next';
import prisma from '../lib/prisma';
import { PRICE, Restaurant } from '@prisma/client';

const fetchRestaurantsByCity = async ({
	city,
	cuisine,
	price,
}: {
	city?: string;
	cuisine?: string;
	price?: PRICE;
}): Promise<Restaurant[]> => {
	let args: Parameters<typeof prisma.restaurant.findMany>[0] = {
		select: {
			id: true,
			name: true,
			main_image: true,
			price: true,
			cuisine: true,
			location: true,
			slug: true,
			reviews: true,
		},
	};

	if (city) {
		args.where = { ...args.where, location: { name: city } };
	}

	if (cuisine) {
		args.where = { ...args.where, cuisine: { name: cuisine } };
	}

	if (price) {
		args.where = { ...args.where, price: price };
	}

	const restaurants = await prisma.restaurant.findMany(args);

	return restaurants;
};

const fetchLocations = async () => {
	const locations = await prisma.location.findMany();

	return locations;
};

const fetchCuisines = async () => {
	const cuisines = await prisma.cuisine.findMany();

	return cuisines;
};

const Search: NextPage<{
	searchParams: { city?: string; cuisine?: string; price: PRICE };
}> = async ({ searchParams }) => {
	const restaurants = await fetchRestaurantsByCity(searchParams);
	const locations = await fetchLocations();
	const cuisines = await fetchCuisines();

	return (
		<>
			<Header />
			<div className='flex py-4 m-auto w-2/3 justify-between items-start'>
				<SearchSideBar
					locations={locations}
					cuisines={cuisines}
					searchParams={searchParams}
				/>
				<div className='w-5/6'>
					{restaurants.length ? (
						restaurants.map((restaurant) => (
							<RestaurantCard key={restaurant.id} restaurant={restaurant} />
						))
					) : (
						<p>Sorry, we found o restaurants in this area</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Search;
