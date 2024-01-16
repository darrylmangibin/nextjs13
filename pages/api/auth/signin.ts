import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import prisma from '../../../app/lib/prisma';
import * as jose from 'jose';
import { setCookie } from 'cookies-next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method === 'POST') {
			const { email, password } = req.body;
			const errors: string[] = [];

			const validationSchema = [
				{
					valid: validator.isEmail(email),
					errorMessage: 'Email is invalid',
				},
				{
					valid: validator.isLength(password, {
						min: 1,
					}),
					errorMessage: 'Password is invalid',
				},
			];

			validationSchema.forEach((check) => {
				if (!check.valid) {
					errors.push(check.errorMessage);
				}
			});

			if (errors.length) {
				return res.status(400).json({ errorMessage: errors[0] });
			}

			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!user) {
				return res.status(401).json({ errorMessage: 'Invalid credentials' });
			}

			const isPasswordMatch = await bcrypt.compare(password, user.password);

			if (!isPasswordMatch) {
				return res.status(401).json({ errorMessage: 'Invalid credentials' });
			}

			const alg = 'HS256';
			const secret = new TextEncoder().encode(process.env.JWT_SECRET);

			const token = await new jose.SignJWT({
				email: user.email,
				id: user.id,
			})
				.setProtectedHeader({ alg })
				.setExpirationTime('24h')
				.sign(secret);

			setCookie('jwt', token, { req, res, maxAge: 60 * 60 * 24 });

			return res.status(200).json({ ...user });
		}

		return res.status(404).json('Route not found');
	} catch (error) {
		res.status(400).json(error);
	}
}
