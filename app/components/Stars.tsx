'use client';

import React, { FC } from 'react';
import fullStar from '../../public/icons/full-star.png';
import halfStar from '../../public/icons/half-star.png';
import emptyStar from '../../public/icons/empty-star.png';
import Image, { StaticImageData } from 'next/image';
import { Review } from '@prisma/client';
import calculateReviewRatingAverage from '../../utils/calculateReviewRatingAverage';

const Stars: FC<{ reviews: Review[]; rating?: number }> = ({
	reviews,
	rating,
}) => {
	const r = rating || calculateReviewRatingAverage(reviews);

	const renderStars = () => {
		const starsArray: StaticImageData[] = [];

		Array.from({ length: 5 }).forEach((_k, i) => {
			const difference = Number((r - i).toFixed(1));

			if (difference >= 1) {
				starsArray.push(fullStar);
			} else if (difference < 1 && difference > 0) {
				if (difference <= 0.2) {
					starsArray.push(emptyStar);
				} else if (difference > 0.2 && difference <= 0.6) {
					starsArray.push(halfStar);
				} else {
					starsArray.push(fullStar);
				}
			} else {
				starsArray.push(emptyStar);
			}
		});

		return starsArray.map((star, i) => {
			return <Image key={i} className='w-4 h-4 mr-1' src={star} alt='' />;
		});
	};

	return <div className='flex items-center'>{renderStars()}</div>;
};

export default Stars;
