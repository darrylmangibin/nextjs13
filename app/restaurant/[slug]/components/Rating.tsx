import { Review } from '@prisma/client';
import { FC } from 'react';
import calculateReviewRatingAverage from '../../../../utils/calculateReviewRatingAverage';
import Stars from '../../../components/Stars';

const Rating: FC<{ reviews: Review[] }> = ({ reviews }) => {
	return (
		<div className='flex items-end'>
			<div className='ratings mt-2 flex items-center'>
				<Stars reviews={reviews} />
				<p className='text-reg ml-3'>{calculateReviewRatingAverage(reviews)}</p>
			</div>
			<div>
				<p className='text-reg ml-4'>{reviews.length} Reviews</p>
			</div>
		</div>
	);
};

export default Rating;
