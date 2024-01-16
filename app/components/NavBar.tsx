'use client';

import Link from 'next/link';
import { FC, useContext } from 'react';
import AuthModal from './AuthModal';
import { AuthenticationContext } from '../context/AuthContext';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const NavBar: FC = () => {
	const { data, setAuthState, loading } = useContext(AuthenticationContext);
	const router = useRouter();

	return (
		<nav className='bg-white p-2 flex justify-between'>
			<Link href='/' className='font-bold text-gray-700 text-2xl'>
				OpenTable
			</Link>
			<div>
				<div className='flex'>
					{loading ? null : data ? (
						<button
							className='border p-1 px-4 rounded mr-3'
							onClick={() => {
								deleteCookie('jwt');
								setAuthState({
									data: null,
									error: null,
									loading: false,
								});
								router.push('/');
							}}>
							Log out
						</button>
					) : (
						<>
							<AuthModal isSignin />
							<AuthModal />
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
