import { PRICE } from '@prisma/client';
import React, { FC } from 'react';

export interface PriceProps {
	price: PRICE;
}

const CheapPrice: FC = () => (
	<>
		<span className='font-bold'>$$</span>
		<span className='text-gray-400'>$$</span>
	</>
);

const RegularPrice: FC = () => (
	<>
		<span className='font-bold'>$$$</span>
		<span className='text-gray-400'>$</span>
	</>
);

const ExpensivePrice: FC = () => (
	<>
		<span className='font-bold'>$$$$</span>
	</>
);

const renderPrice = {
	CHEAP: () => <CheapPrice />,
	REGULAR: () => <RegularPrice />,
	EXPENSIVE: () => <ExpensivePrice />,
};

const Price: FC<PriceProps> = ({ price }) => {
	return renderPrice[price]();
};

export default Price;
