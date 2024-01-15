import React, { FC } from 'react';

const Description: FC<{ description: string }> = ({ description }) => {
	return (
		<div className='mt-4'>
			<p className='text-lg font-light'>{description}</p>
		</div>
	);
};

export default Description;
