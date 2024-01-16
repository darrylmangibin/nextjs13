import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '../../../app/lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			const bearerToken = req.headers.authorization as string;

			const token = bearerToken.split(' ')[1];

			const payload = jwt.decode(token) as jwt.JwtPayload & {
				id: number;
				email: string;
			};

			const user = await prisma.user.findUnique({
				where: { email: payload.email },
				select: {
					id: true,
					first_name: true,
					last_name: true,
					email: true,
					phone: true,
					city: true,
				},
			});

			if (!user) {
				res.status(401).json({ errorMessage: 'User not found' });
			}

			return res.status(200).json({
				...user,
				firstName: user?.first_name,
				lastName: user?.last_name,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}
