import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcryt from 'bcrypt';
import prisma from '../../../app/lib/prisma';
import * as jose from 'jose';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const { firstName, lastName, email, phone, password, city } = req.body;

			const errors: string[] = [];

			const validationSchema = [
				{
					valid: validator.isLength(firstName, {
						min: 1,
						max: 20,
					}),
					errorMessage: 'First name is invalid',
				},
				{
					valid: validator.isLength(lastName, {
						min: 1,
						max: 20,
					}),
					errorMessage: 'Last name is invalid',
				},
				{
					valid: validator.isEmail(email),
					errorMessage: 'Email is invalid',
				},
				{
					valid: validator.isMobilePhone(phone),
					errorMessage: 'Phone is invalid',
				},
				{
					valid: validator.isLength(city, {
						min: 1,
					}),
					errorMessage: 'City is invalid',
				},
				{
					valid: validator.isStrongPassword(password),
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

			const userWithEmail = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (userWithEmail) {
				return res.status(400).json({ errorMessage: 'Email already exists' });
			}

			const salt = await bcryt.genSalt(10);
			const hashedPassword = await bcryt.hash(password, salt);

			const user = await prisma.user.create({
				data: {
					city,
					first_name: firstName,
					last_name: lastName,
					email,
					password: hashedPassword,
					phone,
				},
			});

			const alg = 'HS256';
			const secret = new TextEncoder().encode(process.env.JWT_SECRET);

			const token = await new jose.SignJWT({ email: user.email, id: user.id })
				.setProtectedHeader({ alg })
				.setExpirationTime('24h')
				.sign(secret);

			res.status(200).json({ token });
		} catch (error) {
			console.log(error);
			return res.status(400).json(error);
		}
	}

	return res.status(404).json('Route not found');
}
