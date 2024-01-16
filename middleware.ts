import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest, res: NextResponse) {
	const bearerToken = req.headers.get('authorization');

	if (!bearerToken) {
		return NextResponse.json(
			{ errorMessage: 'Unauthorized request 1' },
			{ status: 401 },
		);
	}

	const token = bearerToken.split(' ')[1];

	if (!token) {
		return new NextResponse(
			JSON.stringify({ errorMessage: 'Unauthorized request 2' }),
			{ status: 401 },
		);
	}

	const secret = new TextEncoder().encode(process.env.JWT_SECRET);

	try {
		await jose.jwtVerify(token, secret);
	} catch (error) {
		return NextResponse.json(
			{ errorMessage: 'Unauthorized request 3' },
			{ status: 401 },
		);
	}
}

export const config = {
	matcher: ['/api/auth/me'],
};
