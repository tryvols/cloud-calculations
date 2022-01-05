import { genSalt, hash, compare } from 'bcryptjs';

export class UsersUtils {
  static async encodePassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  static async checkPassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}