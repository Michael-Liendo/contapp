import { OAuth2Client } from 'google-auth-library';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { EnvConfig } from '../config/env';
import { UnauthorizedError } from './errorHandler';

export class Jwt {
	static createToken(payload: object): Promise<string> {
		return new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				EnvConfig().JWT_PRIVATE_KEY as string,
				{ expiresIn: '20d' },
				(err, token) => {
					if (err) {
						reject(err);
					} else {
						resolve(token as string);
					}
				},
			);
		});
	}

	static verifyToken(token: string): JwtPayload {
		try {
			const userToken = jwt.verify(
				token,
				EnvConfig().JWT_PRIVATE_KEY as string,
			);
			return userToken as JwtPayload;
		} catch (_error) {
			throw new UnauthorizedError('INVALID_TOKEN');
		}
	}

	static async verifyGoogleToken(idToken: string, _isWeb: boolean) {
		try {
			const client = new OAuth2Client(EnvConfig().GOOGLE_WEB_CLIENT_ID);

			const ticket = await client.verifyIdToken({
				idToken: idToken,
				audience: EnvConfig().GOOGLE_WEB_CLIENT_ID,
			});

			const payload = ticket.getPayload();

			const email = payload?.email ?? '';

			return email;
		} catch (_error) {
			throw new UnauthorizedError('INVALID_TOKEN');
		}
	}
}
