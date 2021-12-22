import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/base.service';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';

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