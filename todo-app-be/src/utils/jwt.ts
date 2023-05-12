import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const secret = 'mysecret';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, secret) as { userId: number };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
