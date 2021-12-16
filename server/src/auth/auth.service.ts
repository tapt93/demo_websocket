import { Injectable } from '@nestjs/common';
import { UserService } from 'src/service/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) { }


}
