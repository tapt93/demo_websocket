import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ConnectedDeviceModule } from "./connected-device/connected-device.module";
import { SocketGateway } from "./gateway/gateway.controller";
import { MessageModule } from "./message/message.module";
import { RoomModule } from "./room/room.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    RoomModule,
    MessageModule,
    ConnectedDeviceModule,
    UserModule,
    AuthModule
  ],
  providers: [SocketGateway],
})
export class ChatModule { }
