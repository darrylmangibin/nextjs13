'use client';

import { User } from '@prisma/client';
import {
	FC,
	PropsWithChildren,
	useState,
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react';
import useAuth from '../../hooks/useAuth';
import { getCookie } from 'cookies-next';
import axios, { AxiosError } from 'axios';

export interface AuthContextProps extends PropsWithChildren {}

export interface State {
	loading: boolean;
	error: string | null;
	data: User | null;
}

export interface AuthState extends State {
	setAuthState: Dispatch<SetStateAction<State>>;
}

export const initialeAuthState = {
	loading: true,
	data: null,
	error: null,
	setAuthState: () => {},
};

export const AuthenticationContext =
	createContext<AuthState>(initialeAuthState);

const AuthContext: FC<AuthContextProps> = ({ children }) => {
	const [authState, setAuthState] = useState<State>(initialeAuthState);
	const fetchUser = async () => {
		setAuthState({
			data: null,
			loading: true,
			error: null,
		});
		try {
			const jwt = getCookie('jwt');

			if (!jwt) {
				return setAuthState({
					data: null,
					loading: false,
					error: null,
				});
			}

			const res = await axios.get('http://localhost:3000/api/auth/me', {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});

			axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;

			setAuthState({
				data: res.data,
				loading: false,
				error: null,
			});
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

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<AuthenticationContext.Provider
			value={{
				...authState,
				setAuthState,
			}}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthContext;
