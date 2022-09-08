import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Authenticator {
  generate(input: AuthenticationData): string {
    const token = jwt.sign(input, process.env.JWT_KEY as string, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}
