import { Review } from '@prisma/client';

const calculateReviewRatingAverage = (reviews: Review[] = []) => {
	if (!reviews.length) return 0;

	return Number(
		(
			reviews.reduce((acc, curr) => {
				return acc + curr.rating;
			}, 0) / reviews.length
		).toFixed(2),
	);
};

export default calculateReviewRatingAverage;
