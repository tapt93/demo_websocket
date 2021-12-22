import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJoinRoomDTO } from 'src/models/joinRoomDTO';
import { BaseService } from 'src/shared/base.service';
import { Repository } from 'typeorm';
import { JoinedRoomEntity } from '../entity/joined-room.entity';
import { RoomEntity } from '../entity/room.entity';

@Injectable()
export class JoinedRoomService extends BaseService<JoinedRoomEntity> {
    constructor(
        @InjectRepository(JoinedRoomEntity)
        private readonly _joinedRoomRepository: Repository<JoinedRoomEntity>,
    ) {
        super();
        this._repository = this._joinedRoomRepository;
    }

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

    async addMemberToRoom(room: RoomEntity, joinRoomDTO: IJoinRoomDTO): Promise<void> {
        await this.save({
            userId: joinRoomDTO.from.userId,
            room,
            role: joinRoomDTO.from.role
        });
        await this.save({
            userId: joinRoomDTO.to.userId,
            room,
            role: joinRoomDTO.to.role
        });
    }
}