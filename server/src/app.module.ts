import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { SocketGateway } from './controller/gateway.controller';
import { ConnectedDeviceService } from './service/connected-device.service';
import { JoinedRoomService } from './service/joined-room.service';
import { MessageService } from './service/message.service';
import { RoomService } from './service/room.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_PRIVATE_KEY,
      }),
    }),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, SocketGateway, JoinedRoomService, RoomService, UserService, MessageService, ConnectedDeviceService],
})
export class AppModule { }
