import { Module } from '@nestjs/common';
import { PortsService } from './ports.service';
import { PortsController } from './ports.controller';
import { Port } from './port.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Port])],
  controllers: [PortsController],
  providers: [PortsService],
})
export class PortsModule {}
