import { FC } from 'react';
import calculateReviewRatingAverage from '../../utils/calculateReviewRatingAverage';
import { Review } from '@prisma/client';

const RatingText: FC<{ reviews: Review[] }> = ({ reviews }) => {
	const rating = calculateReviewRatingAverage(reviews);

	if (rating > 4) {
		return 'Awesome';
	}

	if (rating <= 4 && rating > 3) return 'Good';

	if (rating <= 3 && rating > 2) return 'Average';

	return '';
};

export default RatingText;
