import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entity/message.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class MessageService extends BaseService<MessageEntity> {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly _messageRepository: Repository<MessageEntity>,
  ) {
    super();
    this._repository = this._messageRepository;
  }
}