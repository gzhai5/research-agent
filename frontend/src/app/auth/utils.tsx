import jwt from 'jsonwebtoken';


export function isTokenExpired(token: string): boolean {
    try {
        const decoded: any = jwt.decode(token);

        if (!decoded || !decoded.exp) {
            return true;
        }

        const now = Math.floor(Date.now() / 1000);

        return decoded.exp < now;
    } catch (error) {
        console.error("Error decoding the token:", error);
        return true;
    }
}