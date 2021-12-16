import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumerTokens } from 'src/entity/consumer-token.entity';
import { UserTokens } from 'src/entity/user-token.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<UserEntity> {

}