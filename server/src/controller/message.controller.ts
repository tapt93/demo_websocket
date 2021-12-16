import { Controller, Get, Param } from '@nestjs/common';
import { MessageEntity } from 'src/entity/message.entity';
import { MessageService } from 'src/service/message.service';

@Controller()
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get('api/message/:roomId')
    async getMessageFromRoom(@Param('roomId') roomId: number): Promise<any> {
        return await this.messageService.find({
            where: {
                roomId
            },
            order: {
                createdAt: 'ASC'
            }
        });
    }
}