import { UserRole } from '../models/user/user.entity';
import { jwtDecode } from 'jwt-decode';
import { isBefore } from 'date-fns';

export interface DecodedToken {
  role: UserRole;
  exp: number;
  id: string;
}

export async function testIfJwtTokenIsValid(token: string): Promise<boolean> {
  // checks that a token has been provided
  if (!token) {
    throw new Error('No saved token');
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const currentDate = new Date();
    // exp is a timestamp, its value is a number of seconds, so we have to convert it in milliseconds, using exp * 1000
    // because Javascript Date object uses milliseconds
    const expirationDate = new Date(decodedToken.exp * 1000);

    // returns true if token is not expired
    return !isBefore(expirationDate, currentDate);
  } catch (error) {
    console.error('Token expired.');
    return false;
  }
}
