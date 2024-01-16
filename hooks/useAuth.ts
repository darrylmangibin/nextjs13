import axios, { Axios, AxiosError } from 'axios';
import { AuthenticationContext } from '../app/context/AuthContext';
import { useContext } from 'react';
import { User } from '@prisma/client';
import { getCookie } from 'cookies-next';

export type AuthBody = Pick<User, 'city' | 'email' | 'password' | 'phone'> & {
	firstName: string;
	lastName: string;
};

export type SigninBody = Pick<AuthBody, 'email' | 'password'>;

const useAuth = () => {
	const { data, error, loading, setAuthState } = useContext(
		AuthenticationContext,
	);

	const signin = async ({ email, password }: SigninBody, cb?: () => void) => {
		setAuthState((prevState) => ({
			...prevState,
			loading: true,
		}));
		try {
			const res = await axios.post('http://localhost:3000/api/auth/signin', {
				email,
				password,
			});

			setAuthState((prevState) => ({
				...prevState,
				loading: false,
				data: res.data,
			}));
			cb?.();
		} catch (e) {
			const error = e as unknown as AxiosError<{ errorMessage: string }>;
			setAuthState((prevState) => ({
				...prevState,
				loading: false,
				data: null,
				error: error.response?.data.errorMessage || 'Something went wrong',
			}));
		}
	};

	const signup = async (
		{ city, email, firstName, lastName, password, phone }: AuthBody,
		cb?: () => void,
	) => {
		setAuthState((prevState) => ({
			...prevState,
			loading: true,
		}));
		try {
			const res = await axios.post('http://localhost:3000/api/auth/signup', {
				firstName,
				lastName,
				city,
				email,
				password,
				phone,
			});
			setAuthState((prevState) => ({
				...prevState,
				loading: false,
				data: res.data,
			}));
			cb?.();
		} catch (e) {
			const error = e as unknown as AxiosError<{ errorMessage: string }>;
			setAuthState((prevState) => ({
				...prevState,
				loading: false,
				data: null,
				error: error.response?.data.errorMessage || 'Something went wrong',
			}));
		}
	};

	return {
		signin,
		signup,
	};
};

export default useAuth;
