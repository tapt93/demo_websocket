import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  verifyJwt(jwt: string): any {
    return this.jwtService.verify(jwt, { secret: process.env.JWT_PRIVATE_KEY });
  }

}
