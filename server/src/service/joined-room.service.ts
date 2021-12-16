import { Injectable } from '@nestjs/common';
import { JoinedRoomEntity } from 'src/entity/joined-room.entity';
import { BaseService } from './base.service';

@Injectable()
export class JoinedRoomService extends BaseService<JoinedRoomEntity> {
    async getJoinedRoomsByUserAndRole(userId: number, role: string) {
        return await this.find({
            relations: ['room'],
            where: {
                userId,
                role
            },
            select: ['room'],
        })
    }
}