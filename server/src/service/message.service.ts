import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/entity/message.entity';
import { BaseService } from './base.service';

@Injectable()
export class MessageService extends BaseService<MessageEntity> {
  
}