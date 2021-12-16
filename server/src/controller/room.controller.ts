import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RoomService } from 'src/service/room.service';

@Controller()
export class RoomController {
    constructor(private readonly roomService: RoomService,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService) { }

    
}
