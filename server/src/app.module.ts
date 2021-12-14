import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { SocketGateway } from './socket.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_PRIVATE_KEY,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway, AuthService],
})
export class AppModule {}
