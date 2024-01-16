'use client';

import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '../../hooks/useAuth';
import {
	AuthenticationContext,
	initialeAuthState,
} from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';
import Loader from './Loader';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function AuthModal({ isSignin }: { isSignin?: boolean }) {
	const { loading, data, error, setAuthState } = useContext(
		AuthenticationContext,
	);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setInputs({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			city: '',
		});
	};

	const { signin, signup } = useAuth();

	const [inputs, setInputs] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		city: '',
	});

	const renderContent = (signinContent: string, signupContent: string) => {
		return isSignin ? signinContent : signupContent;
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const [disabled, setDisabled] = useState(true);

	const handleClick = async () => {
		if (isSignin) {
			await signin(
				{ email: inputs.email, password: inputs.password },
				handleClose,
			);
		} else {
			await signup(inputs, handleClose);
		}
	};

	useEffect(() => {
		if (isSignin) {
			if (inputs.password && inputs.email) {
				return setDisabled(false);
			}
		} else {
			if (
				inputs.firstName &&
				inputs.lastName &&
				inputs.email &&
				inputs.phone &&
				inputs.password &&
				inputs.city
			) {
				return setDisabled(false);
			}
		}

		setDisabled(true);
	}, [inputs]);

	return (
		<div>
			<button
				className={`${renderContent(
					'bg-blue-400 text-white',
					'',
				)} border p-1 px-4 rounded mr-3`}
				onClick={handleOpen}>
				{renderContent('Sign in', 'Sign up')}
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style} position='relative'>
					{loading && <Loader />}
					<div className='p-2 h-[600px]'>
						{error && <Alert severity='error'>{error}</Alert>}
						<div className='uppercase font-bold text-center pb-2 border-b mb-2'>
							<p className='text-sm'>
								{renderContent('Sign in', 'Create account')}
							</p>
						</div>
						<div className='m-auto'>
							<h2 className='text-2xl font-light text-center'>
								{renderContent(
									'Log in to your account',
									'Create your OpenTable account',
								)}
							</h2>

							<AuthModalInputs
								inputs={inputs}
								handleChangeInput={handleChangeInput}
								isSignin={isSignin}
							/>
							<button
								className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
								disabled={disabled || loading}
								onClick={handleClick}>
								{renderContent('Sign in', 'Create Account')}
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
