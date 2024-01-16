import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
	return (
		<Box
			position='absolute'
			top='50%'
			left='50%'
			sx={{
				transform: 'translate(-50%, -50%)',
			}}>
			<CircularProgress />
		</Box>
	);
};

export default Loader;
