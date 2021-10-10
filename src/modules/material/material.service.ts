import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  create(createMaterialDto: CreateMaterialDto) {
    return 'This action adds a new material';
  }

  readAll() {
    return `This action returns all material`;
  }

  readOne(id: number) {
    return `This action returns a #${id} material`;
  }

  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return `This action updates a #${id} material`;
  }

  delete(id: number) {
    return `This action removes a #${id} material`;
  }
}
