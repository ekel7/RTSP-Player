import { Module } from '@nestjs/common';
import { RtspStreamService } from './rtsp-stream.service';
import { RtspStreamController } from './rtsp-stream.controller';
import { Port } from 'src/ports/port.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Port])],
  controllers: [RtspStreamController],
  providers: [RtspStreamService]
})
export class RtspStreamModule {}
