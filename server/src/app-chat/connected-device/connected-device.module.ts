import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectedDeviceEntity } from './entity/connected-device.entity';
import { ConnectedDeviceService } from './service/connected-device.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConnectedDeviceEntity])
  ],
  providers: [ConnectedDeviceService],
  exports: [ConnectedDeviceService]
})
export class ConnectedDeviceModule { }
