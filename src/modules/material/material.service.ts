import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Material, MaterialDocument } from 'src/database/models/Material';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private materialModel: Model<MaterialDocument>) {}
  create(createMaterialDto: CreateMaterialDto) {
    return 'This action adds a new material';
  }

  async createMany(data: Material[]): Promise<MaterialDocument[]> {
    return this.materialModel.create(data);
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
