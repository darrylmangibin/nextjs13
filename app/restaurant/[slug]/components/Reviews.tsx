import { Review } from '@prisma/client';
import React, { FC } from 'react';
import ReviewCard from '../../../components/ReviewCard';

const Reviews: FC<{ reviews: Review[] }> = ({ reviews }) => {
	return (
		<div>
			<h1 className='font-bold text-3xl mt-10 mb-7 borber-b pb-5'>
				What {reviews.length} people are saying
			</h1>
			<div>
				{reviews.map((review) => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>
		</div>
	);
};

export default Reviews;
