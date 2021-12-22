import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messageLoadSize } from 'src/app-chat/constant/message.constant';
import { BaseService } from 'src/shared/base.service';
import { Equal, LessThan, Repository } from 'typeorm';
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

  /**
   * Get messages by roomId
   * @param roomId 
   * @param startFromId default -1 to get from the lastest message
   * @param take pass -1 to get all (default {messageLoadSize})
   * @returns 
   */
  async findByRoom(roomId, startFromId = -1, take = messageLoadSize): Promise<MessageEntity[]> {
    var filterOption: any = {
      relations: ['room'],
      where: {
        room: {
          id: roomId
        }
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC'
      }
    };

    if (startFromId !== -1) {
      filterOption.where.id = LessThan(startFromId)
    }
    if (take !== -1) {
      filterOption.take = take;
    }

    return this.find(filterOption);
  }
}