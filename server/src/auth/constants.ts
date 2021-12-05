import { randomBytes } from 'crypto';

export const jwtConstants = {
  secret: randomBytes(256).toString('base64'),
  expiresIn: 24 * 60 * 60 * 1000, // one day
};