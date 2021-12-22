import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse } from 'src/models/apiResponse';
import { MessageService } from '../service/message.service';

@Controller('api/message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Get('getMessageFromRoom/:roomId')
    async getMessageFromRoom(@Param('roomId') roomId: number, @Query('fromId') startFromId: number, @Query('take') take): Promise<any> {
        try {
            const data = await this.messageService.findByRoom(roomId, startFromId, take);
            return new ApiResponse(data);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
