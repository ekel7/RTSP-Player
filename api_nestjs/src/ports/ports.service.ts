import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';
import { Port } from './port.model';

@Injectable()
export class PortsService {
  constructor(
    @InjectModel(Port)
    private portModel: typeof Port,
  ) {}

  create(createPortDto: CreatePortDto) {
    return 'This action adds a new port';
  }

  findAll() {
    return `This action returns all ports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} port`;
  }

  update(id: number, updatePortDto: UpdatePortDto) {
    return `This action updates a #${id} port`;
  }

  remove(id: number) {
    return `This action removes a #${id} port`;
  }
}
